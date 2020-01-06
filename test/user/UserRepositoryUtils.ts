import * as UserService from "../../src/user/service/UserService";

export const rollbackUserAuthorization = async (id: number, originalAuthorization: string) => {
    await UserService.updateUserAuthorization(id, originalAuthorization);
};

export const rollbackUserName = async (id: number, originalUserName: string) => {
    await UserService.updateUserName(id, originalUserName);
};