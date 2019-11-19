require('mysql2/node_modules/iconv-lite').encodingExists('foo');

import {UserService} from "../../src/user/userService";

describe('UserService 테스트', () => {

    test('getUser 가 성공적으로 유저를 반환한다.', async () => {
        const savedUser = await UserService.findById(1);
        await expect(savedUser['id']).toBe(1);
        await expect(savedUser['githubId']).toBe("1");
        await expect(savedUser['email']).toBe('e@e.com');
        await expect(savedUser['name']).toBe('test1');
        await expect(savedUser['avatarUrl']).toBe('https://avatar.url');
    });

    test('getTotalNumber 가 성공적으로 전체 갯수를 반환한다.', async () => {
        const total = await UserService.getTotalNumber();
        await expect(total).toBe(11);
    });

    test('getPageableUsers 메서드가 10개씩 뽑아온다.', async () => {
        const list = await UserService.getPageableUsers(1, 10);
        await expect(list.length).toBe(10);
    });

    test('getPageableUsers 메서드가 6개씩 뽑아온다.', async () => {
        const list = await UserService.getPageableUsers(1, 6);
        await expect(list.length).toBe(6);
    });
});