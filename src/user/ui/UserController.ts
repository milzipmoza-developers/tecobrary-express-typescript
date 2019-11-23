import * as UserService from '../service/UserService';
import {parseToNumber} from "../../common/utils/stringParser";

export const totalUsers = async (req, res) => {
    try {
        const totalCount = await UserService.getTotalNumber();
        res.status(200).send({
            total: totalCount
        });
    } catch (error) {
        res.status(404).send({
            message: 'error occurred'
        });
    }
};

export const pageUsers = async (req, res) => {
    try {
        const page = parseToNumber(req.query.page);
        const number = parseToNumber(req.query.number);
        const userList = await UserService.getPageableUsers(page, number);
        res.status(200).send(userList)
    } catch (error) {
        res.status(404).send({
            message: 'error occurred'
        });
    }
};

export const findUserById =  async (req, res) => {
    try {
        const id = parseToNumber(req.params.id);
        const user = await UserService.findById(id);
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send({
            message: 'error occurred'
        });
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
        res.status(404).send({
            message: 'error occurred'
        });
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
        res.status(404).send({
            message: 'error occurred'
        });
    }
};