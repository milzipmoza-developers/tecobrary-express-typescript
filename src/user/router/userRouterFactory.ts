import {Router} from 'express';

import * as UserController from '../ui/UserController';

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