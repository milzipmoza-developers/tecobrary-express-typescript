import * as WishBookService from "../service/WishBookService";
import * as ResponseFactory from "../../common/utils/ResponseFactory";
import {parseToNumber} from "../../common/utils/InputUtils";
import {CannotParseToNumberError} from "../../common/utils/error";
import {NotFoundWishBookError} from "../error";

const _BAD_REQUEST_MESSAGE = 'bad request. parameter is invalid.';
const _ERROR_MESSAGE = 'error occurred';

const wishBooks = async (req, res) => {
    try {
        const page = parseToNumber(req.query.page);
        const number = parseToNumber(req.query.number);
        const books = await WishBookService.getPageableWishBooks(page, number);
        res.status(200).send(books)
    } catch (error) {
        if (error instanceof CannotParseToNumberError) {
            ResponseFactory.sendError(res, 400, _BAD_REQUEST_MESSAGE);
            return;
        }
        ResponseFactory.sendError(res, 404, _ERROR_MESSAGE);
    }
};

const enrollWishBook = async (req, res) => {
    try {
        const wishBookId = parseToNumber(req.body.id);
        const book = await WishBookService.enrollWishBook(wishBookId);
        res.status(200).send({
            message: `${book['title']}을(를) 등록하였습니다.`,
            book
        })
    } catch (error) {
        if (error instanceof CannotParseToNumberError || NotFoundWishBookError) {
            ResponseFactory.sendError(res, 400, _BAD_REQUEST_MESSAGE);
            return;
        }
        ResponseFactory.sendError(res, 404, _ERROR_MESSAGE);
    }
};

const deleteWishBook = async (req, res) => {
    // id 에 해당하는 wish book 을 hard delete
    try {
        const deleteId = parseToNumber(req.query.id);
        const result = await WishBookService.deleteWishBook(deleteId);
        res.status(200).send({
            message: 'success'
        })
    } catch (error) {
        if (error instanceof NotFoundWishBookError) {
            ResponseFactory.sendError(res, 400, error.message);
            return;
        }
        ResponseFactory.sendError(res, 404, _ERROR_MESSAGE);
    }
};

export {
    wishBooks,
    enrollWishBook,
    deleteWishBook
}