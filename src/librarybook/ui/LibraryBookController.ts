import {parseToNumber} from "../../common/utils/InputUtils";
import * as LibraryBookService from "../service/LibraryBookService";
import {CannotParseToNumberError} from "../../common/utils/error";
import * as Response from "../../common/utils/ResponseFactory";
import {NotFoundLibraryBookError} from "../error";
import {LibraryBookVo} from "../LibraryBookVo";
import {UniqueConstraintError} from "sequelize";

const _BAD_REQUEST_MESSAGE = 'bad request. parameter is invalid.';
const _ERROR_MESSAGE = 'error occurred';
const _ALREADY_ENROLLED_MESSAGE = "already enrolled book";

const pageBooks = async (req, res) => {
    try {
        const page = parseToNumber(req.query.page);
        const number = parseToNumber(req.query.number);
        const books = await LibraryBookService.getPageableBooks(page, number);
        res.status(200).send(books);
    } catch (error) {
        if (error instanceof CannotParseToNumberError) {
            Response.sendError(res, 400, _BAD_REQUEST_MESSAGE);
            return;
        }
        Response.sendError(res, 404, _ERROR_MESSAGE);
    }
};

const totalBooks = async (req, res) => {
    try {
        const totalBooks = await LibraryBookService.getTotalNumber();
        res.status(200).send({
            total: totalBooks
        });
    } catch (error) {
        Response.sendError(res, 404, _ERROR_MESSAGE);
    }
};

const searchBooks = async (req, res) => {
    try {
        const title = req.query.title;
        const page = parseToNumber(req.query.page);
        const number = parseToNumber(req.query.number);
        const results = await LibraryBookService.searchBooks(title, page, number);
        res.status(200).send(results);
    } catch (error) {
        if (error instanceof CannotParseToNumberError) {
            Response.sendError(res, 400, _BAD_REQUEST_MESSAGE);
            return;
        }
        Response.sendError(res, 404, _ERROR_MESSAGE);
    }
};

const findBookById = async (req, res) => {
    try {
        const bookId = parseToNumber(req.params.id);
        const book = await LibraryBookService.findById(bookId);
        res.status(200).send(book);
    } catch (error) {
        if (error instanceof CannotParseToNumberError || NotFoundLibraryBookError) {
            Response.sendError(res, 400, _BAD_REQUEST_MESSAGE);
            return;
        }
        Response.sendError(res, 404, _ERROR_MESSAGE);
    }
};

const createBook = async (req, res) => {
    try {
        const requestBook = req.body;
        const libraryBook = new LibraryBookVo(
            requestBook.image,
            requestBook.title,
            requestBook.author,
            requestBook.publisher,
            requestBook.isbn,
            requestBook.description
        );
        const savedBook = await LibraryBookService.createBook(libraryBook);
        res.status(200).send({
            id: savedBook['id'],
            message: `${savedBook['title']} register succeed`
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            Response.sendError(res, 400, _ALREADY_ENROLLED_MESSAGE);
            return;
        }
        Response.sendError(res, 404, _ERROR_MESSAGE);
    }
};

export {
    pageBooks,
    totalBooks,
    searchBooks,
    findBookById,
    createBook
}