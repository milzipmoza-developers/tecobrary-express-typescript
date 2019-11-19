import {sequelize} from "../infra/database/sequelize";
import {User} from "../infra/database/models/User";

const userRepository = sequelize.getRepository(User);

const findById = async (id: number) => {
    const savedUser = await userRepository.findOne({where: {id}});
    return savedUser.get({plain: true});
};

const getTotalNumber = async () => {
    const users = await userRepository.findAll({attributes: ['id']});
    return users.length;
};

const getPageableUsers = async (page: number, numbers: number) => {
    const offset = _getProperOffset(page, numbers);
    const users = await userRepository.findAll({offset: offset, limit: numbers});
    const userList = [];
    users.forEach(user => {
        userList.push(user.get({plain: true}))
    });
    return userList;
};

const _getProperOffset = (page: number, numbers: number) => {
    let offset = 0;
    if (page > 1) {
        offset = numbers * (page - 1);
    }
    return offset;
};

const UserService = {
    findById,
    getTotalNumber,
    getPageableUsers,
};

export {
    UserService
};