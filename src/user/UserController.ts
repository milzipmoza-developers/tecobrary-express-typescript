const UserService = require('./UserService');

const totalUsers = async (req, res) => {
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

const pageUsers = async (req, res) => {
    try {
        const {page, number} = req.query;
        const offset = parseInt(page);
        const limit = parseInt(number);
        const userList = await UserService.getPageableUsers(offset, limit);
        res.status(200).send(userList)
    } catch (error) {
        console.log(error);
        res.status(404).send({
            message: 'error occurred'
        });
    }
};

const findUserById =  async (req, res) => {
    try {
        const {id} = req.params;
        const user = await UserService.findById(parseInt(id));
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send({
            message: 'error occurred'
        });
    }
};

const updateAuthorization = async (req, res) => {
    try {
        const {id, newAuthorization} = req.body;
        await UserService.updateUserAuthorization(id, newAuthorization);
        const updatedUser = await UserService.findById(id);
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(404).send({
            message: 'error occurred'
        });
    }
};

const updateName = async (req, res) => {
    try {
        const {id, newName} = req.body;
        await UserService.updateUserName(id, newName);
        const updatedUser = await UserService.findById(id);
        res.status(200).send(updatedUser);
    } catch (error) {
        res.status(404).send({
            message: 'error occurred'
        });
    }
};

module.exports = {
    totalUsers,
    pageUsers,
    findUserById,
    updateAuthorization,
    updateName
};