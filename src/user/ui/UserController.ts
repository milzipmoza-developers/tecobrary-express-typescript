import * as UserService from '../service/UserService';
import * as ResponseFactory from "../../common/utils/ResponseFactory";

import {parseToNumber} from "../../common/utils/InputUtils";
import {CannotParseToNumberError} from "../../common/utils/error";
import {NotFoundUserError, UpdateUserAuthorizationError, UpdateUserNameError} from "../error";
import {DatabaseError} from "sequelize";


const _BAD_REQUEST_MESSAGE = 'bad request. parameter is invalid.';
const _ERROR_MESSAGE = 'error occurred';

export const totalUsers = async (req, res) => {
    try {
        const totalCount = await UserService.getTotalNumber();
        res.status(200).send({
            total: totalCount
        });
    } catch (error) {
        ResponseFactory.sendError(res, 404, _ERROR_MESSAGE);
    }
};

export const pageUsers = async (req, res) => {
    try {
        const page = parseToNumber(req.query.page);
        const number = parseToNumber(req.query.number);
        const userList = await UserService.getPageableUsers(page, number);
        res.status(200).send(userList);
    } catch (error) {
        if (error instanceof CannotParseToNumberError) {
            ResponseFactory.sendError(res, 400, _BAD_REQUEST_MESSAGE);
            return;
        }
        ResponseFactory.sendError(res, 404, _ERROR_MESSAGE);
    }
};

export const findUserById = async (req, res) => {
    try {
        const id = parseToNumber(req.params.id);
        const user = await UserService.findById(id);
        res.status(200).send(user);
    } catch (error) {
        if (error instanceof CannotParseToNumberError || NotFoundUserError) {
            ResponseFactory.sendError(res, 400, _BAD_REQUEST_MESSAGE);
            return;
        }
        ResponseFactory.sendError(res, 404, _ERROR_MESSAGE);
    }
};

export const updateAuthorization = async (req, res) => {
    try {
        const id = parseToNumber(req.body.id);
        const newAuthorization = req.body.newAuthorization;
        await UserService.updateUserAuthorization(id, newAuthorization);
        const updatedUser = await UserService.findById(id);
        res.status(200).send(updatedUser);
    } catch (error) {
        if (error instanceof DatabaseError || UpdateUserAuthorizationError || CannotParseToNumberError) {
            ResponseFactory.sendError(res, 400, _BAD_REQUEST_MESSAGE);
            return;
        }
        ResponseFactory.sendError(res, 404, _ERROR_MESSAGE);
    }
};

export const updateName = async (req, res) => {
    try {
        const id = parseToNumber(req.body.id);
        const newName = req.body.newName;
        await UserService.updateUserName(id, newName);
        const updatedUser = await UserService.findById(id);
        res.status(200).send(updatedUser);
    } catch (error) {
        if (error instanceof DatabaseError || UpdateUserNameError || CannotParseToNumberError) {
            ResponseFactory.sendError(res, 400, _BAD_REQUEST_MESSAGE);
            return;
        }
        ResponseFactory.sendError(res, 404, _ERROR_MESSAGE);
    }
};