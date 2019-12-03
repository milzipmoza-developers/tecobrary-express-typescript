import {Router} from 'express';
import * as WishBookController from "../ui/WishBookController"

export const wishBookRouterFactory = () => Router()
    .get('/wishes',
        WishBookController.wishBooks)

    .post('/wishes',
        WishBookController.enrollWishBook)

    .delete('/wishes',
        WishBookController.deleteWishBook)
;