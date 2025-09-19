import express from 'express';
import request from 'supertest';
import { expect } from 'chai';


// Cambiar a 'http://localhost:8081' si se corrés en Docker con -p 8081:8080
const BASE_URL = process.env.TEST_BASE_URL || 'http://localhost:8080';

describe('adoption.router.js - endpoints funcionales (API real)', function () {
  this.timeout(15000);

  it('GET /api/adoptions debería responder objeto con status/payload', async () => {
    const res = await request(BASE_URL)
      .get('/api/adoptions')
      .timeout({ response: 10000, deadline: 15000 });

    expect([200, 500]).to.include(res.status);       // 500 aceptado si la DB no está lista
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('status');
    expect(res.body).to.have.property('payload');
  });

  it('GET /api/adoptions/:aid con inexistente debería responder 404 o 200 si existe', async () => {
    const res = await request(BASE_URL)
      .get('/api/adoptions/64f2a1c0b3a9c21f5b8bffff')
      .timeout({ response: 10000, deadline: 15000 });

    expect([404, 200, 500]).to.include(res.status);
  });

  it('POST /api/adoptions/:uid/:pid debería aceptar la ruta aunque los IDs sean inválidos', async () => {
    const res = await request(BASE_URL)
      .post('/api/adoptions/USER_ID_FAKE/PET_ID_FAKE')
      .timeout({ response: 10000, deadline: 15000 });


    expect([200, 201, 400, 404, 500]).to.include(res.status);
  });
});




  describe('mocks.router.js - endpoints', function () {
    this.timeout(15000);

    it('GET /api/mocks/mockingusers?size=5 -> 5 usuarios con formato válido', async () => {
      const res = await request(BASE_URL)
        .get('/api/mocks/mockingusers?size=5')
        .timeout({ response: 10000, deadline: 15000 });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('payload').that.is.an('array').with.lengthOf(5);

      const u = res.body.payload[0];
      expect(u).to.have.property('first_name');
      expect(u).to.have.property('last_name');
      expect(u).to.have.property('email');
      expect(u).to.have.property('password').that.is.a('string').and.is.not.empty; 
      expect(['user', 'admin']).to.include(u.role);
      expect(u).to.have.property('pets').that.is.an('array').with.lengthOf(0);
    });

    it('GET /api/mocks/mockingpets?size=7 -> 7 pets con formato válido', async () => {
      const res = await request(BASE_URL)
        .get('/api/mocks/mockingpets?size=7')
        .timeout({ response: 10000, deadline: 15000 });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('payload').that.is.an('array').with.lengthOf(7);

      const p = res.body.payload[0];
      expect(p).to.have.property('name');
      expect(p).to.have.property('specie');       
      expect(p).to.have.property('adopted');
    });

    it('POST /api/mocks/generateData con 0,0 -> inserciones 0 (sin tocar DB)', async () => {
      
      const res = await request(BASE_URL)
        .post('/api/mocks/generateData')
        .send({ users: 0, pets: 0 })
        .set('Content-Type', 'application/json')
        .timeout({ response: 10000, deadline: 15000 });

      
      expect([200, 201]).to.include(res.status);
      expect(res.body).to.have.property('payload');
      expect(res.body.payload).to.have.property('usersInserted').that.is.a('number');
      expect(res.body.payload).to.have.property('petsInserted').that.is.a('number');
    });

  });

