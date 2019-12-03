import * as RentHistoryService from "../service/RentHistoryService";
import * as ResponseFactory from "../../common/utils/ResponseFactory";
import {parseToNumber} from "../../common/utils/InputUtils";
import {CannotParseToNumberError} from "../../common/utils/error";
import {NotFoundSerialError} from "../../serial/error";
import {AlreadyRentSerialError, AlreadyReturnedSerialError} from "../error";

const _NOT_FOUND = 'error occurred';

const userRents = async (req, res) => {
    try {
        const userId = parseToNumber(req.params.userId);
        const userRents = await RentHistoryService.userRents(userId);
        res.status(200).send(userRents);
    } catch (error) {
        if (error instanceof CannotParseToNumberError) {
            ResponseFactory.sendError(res, 400, error.message);
            return;
        }
        ResponseFactory.sendError(res, 404, _NOT_FOUND);
    }
};

const allUserRents = async (req, res) => {
    try {
        const page = parseToNumber(req.query.page);
        const number = parseToNumber(req.query.number);
        const allUserRents = await RentHistoryService.allUserRents(page, number);
        res.status(200).send(allUserRents);
    } catch (error) {
        if (error instanceof CannotParseToNumberError) {
            ResponseFactory.sendError(res, 400, error.message);
            return;
        }
        ResponseFactory.sendError(res, 404, _NOT_FOUND);
    }
};

const rentBook = async (req, res) => {
    try {
        const serialNumber = parseToNumber(req.body.serial);
        const userId = parseToNumber(req.body.userId);
        const rentResult = await RentHistoryService.rentBook(serialNumber, userId);
        const {book, rent} = rentResult;
        res.status(200).send({
            message: `${book['title']} 을 성공적으로 대여하였습니다.`,
            info: {rent}
        })
    } catch (error) {
        if (error instanceof CannotParseToNumberError
            || NotFoundSerialError
            || AlreadyRentSerialError) {
            ResponseFactory.sendError(res, 400, error.message);
            return;
        }
        ResponseFactory.sendError(res, 404, _NOT_FOUND);
    }
};

const returnBook = async (req, res) => {
    try {
        const serialNumber = parseToNumber(req.query.serial);
        const returnResult = await RentHistoryService.returnBook(serialNumber);
        res.status(200).send({
            message: `${returnResult.book['title']} 을 성공적으로 반납하였습니다.`,
            info: {returnDate: Date.now()}
        })
    } catch (error) {
        if (error instanceof CannotParseToNumberError
            || NotFoundSerialError
            || AlreadyReturnedSerialError) {
            ResponseFactory.sendError(res, 400, error.message);
            return;
        }
        ResponseFactory.sendError(res, 404, _NOT_FOUND);
    }
};

export {
    userRents,
    allUserRents,
    rentBook,
    returnBook
}