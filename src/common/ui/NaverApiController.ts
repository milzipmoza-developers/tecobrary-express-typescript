import * as NaverApiService from '../service/NaverApiService'
import * as ErrorResponse from "../utils/ErrorResponse";
import {calculate} from "../utils/OffsetCalculator";

const _ERROR_MESSAGE = 'error occurred';

export const searchBooks = async (req, res) => {
    try {
        const {title, number, page} = req.query;
        const offset = calculate(page, number);
        const books = await NaverApiService.searchBooks(title, number, offset);
        res.status(200).send(books);
    } catch (error) {
        console.log(error);
        ErrorResponse.send(res, 404, _ERROR_MESSAGE);
    }
};