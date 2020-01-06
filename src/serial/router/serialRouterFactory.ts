import {Router} from 'express'
import * as SerialController from "../ui/SerialController";

export const serialRouterFactory = () => Router()
    .get('/serials',
        SerialController.bookSerials)

    .post('/serials',
        SerialController.enrollSerial)

    .delete('/serials',
        SerialController.deleteSerial)
;
