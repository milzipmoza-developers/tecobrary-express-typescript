import {GithubUserVo} from "../../src/user/GithubUserVo";
import * as UserService from "../../src/user/service/UserService";
import {rollbackUserAuthorization, rollbackUserName} from "./UserRepositoryUtils";

require('mysql2/node_modules/iconv-lite').encodingExists('foo');


describe('UserService 테스트', () => {
    test('findById 가 성공적으로 유저를 반환한다.', async () => {
        const savedUser: Object = await UserService.findById(1);
        await expect(savedUser['id']).toBe(1);
        await expect(savedUser['githubId']).toBe('12345678');
        await expect(savedUser['email']).toBe('erasede@tecobrary.com');
        await expect(savedUser['name']).toBe('루피');
        await expect(savedUser['avatarUrl']).toBe('https://avatars3.githubusercontent.com/u/32266963?v=4');
        await expect(savedUser['authorization']).toBe('KING')
    });

    test('getTotalNumber 가 성공적으로 전체 갯수를 반환한다.', async () => {
        const total: number = await UserService.getTotalNumber();
        await expect(total).toBe(32);
    });

    test('getPageableUsers 메서드가 10개씩 뽑아온다.', async () => {
        const list: Array<Object> = await UserService.getPageableUsers(1, 10);
        await expect(list.length).toBe(10);
    });

    test('getPageableUsers 메서드가 6개씩 뽑아온다.', async () => {
        const list: Array<Object> = await UserService.getPageableUsers(1, 6);
        await expect(list.length).toBe(6);
    });

    test('createUser 가 성공적으로 유저를 생성한다.', async () => {
        const githubUser = new GithubUserVo(
            '123123',
            'new@user.com',
            'user',
            'https://avatar.url'
        );
        const createdUser = await UserService.createUser(githubUser);
        await expect(createdUser['id']).not.toBeNull();
        await expect(createdUser['githubId']).toBe(123123);
        await expect(createdUser['email']).toBe('new@user.com');
        await expect(createdUser['name']).toBe('user');
        await expect(createdUser['avatarUrl']).toBe('https://avatar.url');
        await expect(createdUser['authorization']).toBe('NONE');

        await UserService.deleteUserById(createdUser['id']);
    });

    test('updateAuthorization 이 정상적으로 권한을 업데이트 한다.', async () => {
        const testTargetUserId = 2;
        // check before update
        const beforeUpdated = await UserService.findById(testTargetUserId);
        await expect(beforeUpdated['authorization']).toBe('USER');
        // update userAuthorization NONE to KING
        await UserService.updateUserAuthorization(testTargetUserId, 'KING');
        // check after update
        const afterUpdate = await UserService.findById(testTargetUserId);
        await expect(afterUpdate['authorization']).toBe('KING');
        // rollback
        await rollbackUserAuthorization(testTargetUserId, beforeUpdated['authorization']);
    });

    test('updateUserName 이 정상적으로 이름을 업데이트 한다.', async () => {
        const testTargetUserId = 2;
        // check before update
        const beforeUpdated = await UserService.findById(testTargetUserId);
        await expect(beforeUpdated['name']).toBe('텤텤');
        // update user name a to newName
        await UserService.updateUserName(testTargetUserId, 'newName');
        // check after update
        const afterUpdate = await UserService.findById(testTargetUserId);
        await expect(afterUpdate['name']).toBe('newName');
        // rollback
        await rollbackUserName(testTargetUserId, beforeUpdated['name']);
    });
});