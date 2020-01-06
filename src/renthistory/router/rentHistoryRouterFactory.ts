import {Router} from 'express';
import * as RentHistoryController from '../controller/RentHistoryController';

export const rentHistoryRouterFactory = () => Router()
    .get('/rents/all',
        RentHistoryController.allUserRents)

    .get('/rents/:userId',
        RentHistoryController.userRents)

    .post('/rents',
        RentHistoryController.rentBook)

    .delete('/rents',
        RentHistoryController.returnBook)
;
