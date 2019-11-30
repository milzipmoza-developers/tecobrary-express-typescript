import {app} from "../../src/app";
import {rollbackUserAuthorization, rollbackUserName} from "./UserRepositoryUtils";

const request = require('supertest');

const _NEW_NAME = 'Hello';
const _TARGET_USER_ID = 1;

const _STATUS_CODE = {
    BAD_REQUEST: 400,
    OK: 200,
};

describe('userRouterFactory 테스트', () => {
    test('[GET] /users/all, total user 수를 반환한다.', async () => {
        const res = await request(app)
            .get('/users/all')
            .send();

        expect(res.statusCode).toBe(_STATUS_CODE.OK);
        expect(res.body.total).not.toBeNull();
    });

    test('[GET] /users, page 에 맞는 user list 를 반환한다.', async () => {
        const res = await request(app)
            .get('/users')
            .query({page: '1', number: '10'})
            .send();

        expect(res.statusCode).toBe(_STATUS_CODE.OK);
        expect(res.body.length).toBe(10);
    });

    test('[GET] /users, page 가 문자열일때 Bad Request', async () => {
        const res = await request(app)
            .get('/users')
            .query({page: 'd', number: '10'})
            .send();

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
        expect(res.body.message).toBe('bad request. parameter is invalid.');
    });

    test('[GET] /users, number 가 문자열일 때 Bad Request', async () => {
        const res = await request(app)
            .get('/users')
            .query({page: '1', number: 'd'})
            .send();

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
        expect(res.body.message).toBe('bad request. parameter is invalid.');
    });

    test('[GET] /users/:id, 해당하는 id 의 유저를 성공적으로 응답 받는다.', async () => {
        const res = await request(app)
            .get('/users/1')
            .send();

        const user = res.body;
        expect(user.id).toBe(1);
        expect(user.githubId).toBe('12345678');
        expect(user.email).toBe('erasede@tecobrary.com');
        expect(user.name).toBe('루피');
        expect(user.avatarUrl).toBe('https://avatars3.githubusercontent.com/u/32266963?v=4');
        expect(user.authorization).toBe('KING');
    });

    test('[GET] /users/:id, 존재하지 않는 유저일 때 Bad Request', async () => {
        const res = await request(app)
            .get('/users/100')
            .send();

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
        expect(res.body.message).toBe('bad request. parameter is invalid.');
    });

    test('[GET] /users/:id, id 가 문자열일 때 Bad Request', async () => {
        const res = await request(app)
            .get('/users/dd')
            .send();

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
        expect(res.body.message).toBe('bad request. parameter is invalid.');
    });
    
    test('[POST] /users, updateAuthorization 을 성공한다.', async () => {
        const _TARGET_NEW_AUTHORIZATION = 'USER';

        const res = await request(app)
            .post('/users')
            .send({id: _TARGET_USER_ID, newAuthorization: _TARGET_NEW_AUTHORIZATION});

        expect(res.statusCode).toBe(_STATUS_CODE.OK);
        expect(res.body.id).toBe(_TARGET_USER_ID);
        expect(res.body.authorization).toBe(_TARGET_NEW_AUTHORIZATION);

        await rollbackUserAuthorization(_TARGET_USER_ID, 'KING');
    });

    test('[POST] /users, 유효하지 않은 auth 로 요청시 Bad Request', async () => {
        const res = await request(app)
            .post('/users')
            .send({id: `2`, newAuthorization: 'GOD'});

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
    });

    test('[POST] /users, 존재하지 않는 유저로 요청시 Bad Request', async () => {
        const res = await request(app)
            .post('/users')
            .send({id: `100`, newAuthorization: 'GOD'});

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
    });

    test('[POST] /users, 파라미터 id가 누락되면 Bad Request', async () => {
        const res = await request(app)
            .post('/users')
            .send({newAuthorization: 'GOD'});

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
    });

    test('[POST] /users, 파라미터 newAuthorization 누락되면 Bad Request', async () => {
        const res = await request(app)
            .post('/users')
            .send({id: _TARGET_USER_ID});

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
    });

    test('[PATCH] /users, updateName 을 성공한다.', async () => {
        const res = await request(app)
            .patch('/users')
            .send({id: _TARGET_USER_ID, newName: _NEW_NAME});

        expect(res.statusCode).toBe(_STATUS_CODE.OK);
        expect(res.body.id).toBe(_TARGET_USER_ID);
        expect(res.body.name).toBe(_NEW_NAME);

        await rollbackUserName(_TARGET_USER_ID, '루피');
    });

    test('[PATCH] /users, 존재하지 않는 유저로 요청시 Bad Request', async () => {
        const res = await request(app)
            .patch('/users')
            .send({id: 100, newName: _NEW_NAME});

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
    });

    test('[PATCH] /users, 파라미터 id 가 누락되면 Bad Request', async () => {
        const res = await request(app)
            .patch('/users')
            .send({newName: _NEW_NAME});

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
    });

    test('[PATCH] /users, 파라미터 newName 이 누락되면 Bad Request', async () => {
        const res = await request(app)
            .patch('/users')
            .send({id: _TARGET_USER_ID});

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
    });
});