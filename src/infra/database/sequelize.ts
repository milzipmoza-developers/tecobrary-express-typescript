import {Sequelize} from "sequelize-typescript";

export const sequelize = new Sequelize(
    'tecoexpress',
    'luffy',
    '159456',
    {
        repositoryMode: true,
        dialect: 'mysql',
        database: 'tecoexpress',
        username: 'root',
        password: '159456',
        storage: ':memory:',
        models: [__dirname + '/models'],
    })