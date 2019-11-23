const {Router} = require('express');

const UserController = require('./UserController');

export const userRouterFactory = () => Router()
    .get('/users/all',
        UserController.totalUsers)

    .get('/users',
        UserController.pageUsers)

    .get('/users/:id',
        UserController.findUserById)

    .post('/users',
        UserController.updateAuthorization)

    .patch('/users',
        UserController.updateName);