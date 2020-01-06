import {Router} from 'express';
import * as LibraryBookController from "../ui/LibraryBookController";

export const libraryBookRouterFactory = () => Router()
    .get('/books',
        LibraryBookController.pageBooks)

    .post('/books',
        LibraryBookController.createBook)

    .get('/books/all',
        LibraryBookController.totalBooks)

    .get('/books/search',
        LibraryBookController.searchBooks)

    .get('/books/:id',
        LibraryBookController.findBookById)
;