import {Sequelize} from "sequelize-typescript";

const models = [
    __dirname + '/models/User.ts',
    __dirname + '/models/LibraryBook.ts',
    __dirname + '/models/WishBook.ts',
    __dirname + '/models/RentHistory.ts',
    __dirname + '/models/Serial.ts',
];

export const sequelize = new Sequelize(
    process.env.MODE === 'test' ? 'test_tecoexpress' : 'tecoexpress',
    'luffy',
    '159456',
    {
        repositoryMode: true,
        dialect: 'mysql',
        database: process.env.MODE === 'test' ? 'test_tecoexpress' : 'tecoexpress',
        username: 'root',
        password: '159456',
        storage: ':memory:',
        models: models,
    });