import {Sequelize} from "sequelize-typescript";

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
        models: [__dirname + '/models'],
    })