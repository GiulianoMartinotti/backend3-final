// src/utils/mocking.js
import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';


const HASHED_PASSWORD = bcrypt.hashSync('coder123', 10);


const randomRole = () => (Math.random() < 0.2 ? 'admin' : 'user');


export function generateUser() {
    return {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email().toLowerCase(),
        password: HASHED_PASSWORD,
        role: randomRole(),
        pets: [],              
        createdAt: new Date()
    };
}

export function generateUsers(count = 50) {
    return Array.from({ length: count }, () => generateUser());
}


export function generatePet() {
    const species = ['dog', 'cat', 'bird', 'rabbit', 'hamster'];
    return {
        name: faker.person.firstName(),
        specie: faker.helpers.arrayElement(species),
        birthDate: faker.date.past({ years: 10 }),
        adopted: false,
        createdAt: new Date()
    };
}

export function generatePets(count = 50) {
    return Array.from({ length: count }, () => generatePet());
}
