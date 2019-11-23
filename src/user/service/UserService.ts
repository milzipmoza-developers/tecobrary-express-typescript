import {sequelize} from "../../infra/database/sequelize";
import {User} from "../../infra/database/models/User";
import {GithubUser} from "../GithubUser";
import {UpdateUserAuthorizationError, UpdateUserNameError} from "../error/";

const userRepository = sequelize.getRepository(User);

export const findById = async (id: number) => {
    const savedUser = await userRepository.findOne({where: {id}});
    return savedUser.get({plain: true});
};

export const createUser = async (user: GithubUser) => {
    const savedUser = await userRepository.create({
        githubId: user.githubId,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl
    });
    return savedUser.get({plain: true});
};

export const deleteUserById = async (id: number) => {
    const deletedUser = await userRepository.destroy({where: {id}});
    return deletedUser;
};

export const updateUserAuthorization = async (id: number, authorization: string) => {
    const updateResult = await userRepository.update(
        {
            authorization: authorization
        },
        {
            where: {id: id}
        });
    if (updateResult[0] === 1) {
        return;
    } else {
        throw new UpdateUserAuthorizationError();
    }
};

export const updateUserName = async (id: number, name: string) => {
    const updateResult = await userRepository.update(
        {
            name
        },
        {
            where: {id}
        });
    if (updateResult[0] === 1) {
        return;
    } else {
        throw new UpdateUserNameError();
    }
};

export const getTotalNumber = async () => {
    const users = await userRepository.findAll({attributes: ['id']});
    return users.length;
};

export const getPageableUsers = async (page: number, limit: number) => {
    const offset = _getProperOffset(page, limit);
    const users = await userRepository.findAll({offset, limit});
    const userList = [];
    users.forEach(user => {
        userList.push(user.get({plain: true}))
    });
    return userList;
};

const _getProperOffset = (page: number, limit: number) => {
    let offset = 0;
    if (page > 1) {
        offset = limit * (page - 1);
    }
    return offset;
};