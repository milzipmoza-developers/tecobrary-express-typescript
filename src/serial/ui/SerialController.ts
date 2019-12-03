import {parseToNumber} from "../../common/utils/InputUtils";
import * as SerialService from "../service/SerialService";
import * as ResponseFactory from "../../common/utils/ResponseFactory";
import {NotFoundSerialError, NotFoundSerialTargetError} from "../error";
import {UniqueConstraintError} from "sequelize";
import {CannotParseToNumberError} from "../../common/utils/error";

const bookSerials = async (req, res) => {
    try {
        const bookId = parseToNumber(req.query.bookId);
        const serials = await SerialService.findSerialsByBookId(bookId);
        res.status(200).send(serials);
    } catch (error) {
        if (error instanceof CannotParseToNumberError) {
            ResponseFactory.sendError(res, 400, 'bad request. parameter is invalid.');
            return;
        }
        ResponseFactory.sendError(res, 404, 'error occurred');
    }
};

const enrollSerial = async (req, res) => {
    try {
        const id = parseToNumber(req.body.id);
        const bookId = parseToNumber(req.body.bookId);
        const savedSerial = await SerialService.createSerial(id, bookId);
        res.status(200).send({
            message: '등록에 성공하였습니다.',
            serial: savedSerial
        });
    } catch (error) {
        if (error instanceof NotFoundSerialTargetError) {
            ResponseFactory.sendError(res, 400, error.message);
            return;
        }
        if (error instanceof UniqueConstraintError) {
            ResponseFactory.sendError(res, 400, '해당하는 일련번호가 이미 존재합니다.');
            return;
        }
        ResponseFactory.sendError(res, 404, 'error occurred');
    }
};

const deleteSerial = async (req, res) => {
    try {
        const id = parseToNumber(req.query.id);
        const result = await SerialService.deleteSerial(id);
        res.status(200).send({
            message: 'success'
        })
    } catch (error) {
        if (error instanceof NotFoundSerialError) {
            ResponseFactory.sendError(res, 400, error.message);
            return;
        }
        ResponseFactory.sendError(res, 404, 'error occurred');
    }
};

export {
    bookSerials,
    enrollSerial,
    deleteSerial
}