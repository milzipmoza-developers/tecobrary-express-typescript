import {sequelize} from "../infra/database/sequelize";
import {User} from "../infra/database/models/User";
import {GithubUser} from "./githubUser";
import {UpdateUserAuthorizationError} from "./error/UpdateUserAuthorizationError";
import {UpdateUserNameError} from "./error/UpdateUserNameError";

const userRepository = sequelize.getRepository(User);

const findById = async (id: number) => {
    const savedUser = await userRepository.findOne({where: {id}});
    return savedUser.get({plain: true});
};

const createUser = async (user: GithubUser) => {
    const savedUser = await userRepository.create({
        githubId: user.githubId,
        email: user.email,
        name: user.name,
        avatarUrl: user.avatarUrl
    });
    return savedUser.get({plain: true});
};

const deleteUserById = async (id: number) => {
    const deletedUser = await userRepository.destroy({where: {id}});
    return deletedUser;
};

const updateUserAuthorization = async (id: number, authorization: string) => {
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

const updateUserName = async (id: number, name: string) => {
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

const getTotalNumber = async () => {
    const users = await userRepository.findAll({attributes: ['id']});
    return users.length;
};

const getPageableUsers = async (page: number, limit: number) => {
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

module.exports = {
    findById,
    createUser,
    deleteUserById,
    updateUserAuthorization,
    updateUserName,
    getTotalNumber,
    getPageableUsers,
};