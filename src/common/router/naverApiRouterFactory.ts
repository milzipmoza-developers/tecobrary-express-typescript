import {Router} from 'express';

import * as NaverApiController from '../ui/NaverApiController'

export const naverApiRouterFactory = () => Router()
    .get('/naverapi/search',
        NaverApiController.searchBooks);