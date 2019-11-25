import * as NaverApiService from '../service/NaverApiService'
import * as ResponseFactory from "../utils/ResponseFactory";
import {calculate} from "../utils/OffsetCalculator";

const _ERROR_MESSAGE = 'error occurred';

export const searchBooks = async (req, res) => {
    try {
        const {title, number, page} = req.query;
        const offset = calculate(page, number);
        const books = await NaverApiService.searchBooks(title, number, offset);
        res.status(200).send(books);
    } catch (error) {
        ResponseFactory.sendError(res, 404, _ERROR_MESSAGE);
    }
};