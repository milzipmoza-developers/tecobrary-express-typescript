import {app} from "../../src/app";
import * as SerialService from "../../src/serial/service/SerialService";

const request = require('supertest');

describe('serialRouterFactory 테스트', () => {
    test('[GET] /serials, 해당 도서의 전체 Serial 을 반환한다.', async () => {
        const res = await request(app)
            .get('/serials')
            .query({'bookId': 9})
            .send();

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(4);
    });

    test('[GET] /serials, 문자열인 bookId 에 대해서 Bad Request', async () => {
        const res = await request(app)
            .get('/serials')
            .query({'bookId': 'd'})
            .send();

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('bad request. parameter is invalid.');
    });

    test('[POST] /serials, Serial 을 정상적으로 등록한다.', async () => {
        const newSerial = 300;
        const res = await request(app)
            .post('/serials')
            .send({'serial': newSerial, 'bookId': 9});

        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('등록에 성공하였습니다.');
        expect(res.body.serial).not.toBeNull();

        // rollback
        await SerialService.deleteSerial(newSerial);
    });

    test('[POST] /serials, 이미 존재하는 serial 에 대해 Bad Request', async () => {
        const newSerial = 1;
        const res = await request(app)
            .post('/serials')
            .send({'serial': newSerial, 'bookId': 9});

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('해당하는 일련번호가 이미 존재합니다.');
    });

    test('[POST] /serials, 존재하지 않는 bookId 에 대해 Bad Request', async () => {
        const newSerial = 300;
        const res = await request(app)
            .post('/serials')
            .send({'serial': newSerial, 'bookId': 1000});

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('해당하는 책이 존재하지 않습니다.');
    });
});