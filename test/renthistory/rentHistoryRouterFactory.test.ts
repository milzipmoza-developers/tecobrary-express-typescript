import {app} from "../../src/app";

const request = require('supertest');

const _STATUS_CODE = {
    BAD_REQUEST: 400,
    OK: 200,
};

describe('rentHistoryRouterFactory 테스트', () => {

    test('[GET] /rents/12, 요청에 성공한다.', async () => {
        const res = await request(app)
            .get('/rents/12')
            .send();

        console.log(res.body);

        expect(res.statusCode).toBe(_STATUS_CODE.OK);
        expect(res.body.length).toBe(2);
    });

    test('[GET] /rents/all, 요청에 성공한다.', async () => {
        const res = await request(app)
            .get('/rents/all')
            .query({page: 1, number: 4})
            .send();

        console.log(res.body);

        expect(res.statusCode).toBe(_STATUS_CODE.OK);
        expect(res.body.length).toBe(4);
    });

    test('[POST] /rents, 요청에 성공한다.', async () => {
        const res = await request(app)
            .get('/rents')
            .query()
            .send({serial: 1, userId: 4});

        console.log(res.body);

        expect(res.statusCode).toBe(_STATUS_CODE.OK);
        expect(res.body.length).toBe(4);
    });
});