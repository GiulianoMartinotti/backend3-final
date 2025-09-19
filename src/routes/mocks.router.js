import { Router } from 'express';
import { generateUsers, generatePets } from '../utils/mocking.js';


import UserModel from '../dao/models/User.js';
import PetModel from '../dao/models/Pet.js';

const router = Router();


router.get('/mockingpets', async (req, res) => {
    try {
        const size = Number(req.query.size) || 100;
        const pets = generatePets(size);
        res.json({ status: 'success', payload: pets, count: pets.length });
    } catch (err) {
        res.status(500).json({ status: 'error', error: String(err) });
    }
});


router.get('/mockingusers', async (req, res) => {
    try {
        const size = Number(req.query.size) || 50;
        const users = generateUsers(size);
        res.json({ status: 'success', payload: users, count: users.length });
    } catch (err) {
        res.status(500).json({ status: 'error', error: String(err) });
    }
});


router.post('/generateData', async (req, res) => {
    try {
        const usersQty = Number(req.body?.users) || 0;
        const petsQty = Number(req.body?.pets) || 0;

        const payload = {};

        if (usersQty > 0) {
            const users = generateUsers(usersQty);
            const insertedUsers = await UserModel.insertMany(users, { ordered: false });
            payload.usersInserted = insertedUsers.length;
        } else {
            payload.usersInserted = 0;
        }

        if (petsQty > 0) {
            const pets = generatePets(petsQty);
            const insertedPets = await PetModel.insertMany(pets, { ordered: false });
            payload.petsInserted = insertedPets.length;
        } else {
            payload.petsInserted = 0;
        }

        res.status(201).json({ status: 'success', payload });
    } catch (err) {
        res.status(500).json({ status: 'error', error: String(err) });
    }
});

export default router;
