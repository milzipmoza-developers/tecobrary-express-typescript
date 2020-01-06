import {app} from "../../src/app";

const request = require('supertest');

const _STATUS_CODE = {
    BAD_REQUEST: 400,
    OK: 200,
};

describe('wishBookRouterFactory 테스트', () => {

    test('[GET] /wishes, page 1, number 10 에 해당하는 wish book list 를 반환한다.', async () => {
        const res = await request(app)
            .get('/wishes')
            .query({page: '1', number: '10'})
            .send();

        console.log(res.body);

        expect(res.statusCode).toBe(_STATUS_CODE.OK);
        // now not bought wish book is only one
        expect(res.body.length).toBe(1);
    });

    test('[POST] /wishes, wish book id 에 맞는 wish book 을 soft delete 하고 library book 에 등록한다.', async () => {
        const res = await request(app)
            .post('/wishes')
            .send({id: '23'});

        expect(res.statusCode).toBe(_STATUS_CODE.OK);

        expect(res.body.message).toBe("스프링 부트와 AWS로 혼자 구현하는 웹 서비스 (인텔리제이, JPA, JUnit 테스트, 그레이들)을(를) 등록하였습니다.");
        expect(res.body.book.title).toBe("스프링 부트와 AWS로 혼자 구현하는 웹 서비스 (인텔리제이, JPA, JUnit 테스트, 그레이들)");
    });

    test('[POST] /wishes, wish book id 에 맞는 wish book 이 없으면 Bad Request 를 응답한다.', async () => {
        const res = await request(app)
            .post('/wishes')
            .send({id: '100000'});

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
    });

    test('[DELETE] /wishes, wish book 에 맞는 wish book 을 hard delete 한다.', async () => {
        const res = await request(app)
            .delete('/wishes')
            .query({id: '1'})
            .send();

        expect(res.statusCode).toBe(_STATUS_CODE.OK);
        expect(res.body.message).toBe('success');
    });

    test('[DELETE] /wishes, wish book 에 없는 id 는 Bad Request 를 응답한다.', async () => {
        const res = await request(app)
            .delete('/wishes')
            .query({id: '10000000'})
            .send();

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);

        expect(res.body.message).toBe('해당 희망 도서를 찾을 수 없습니다.');
    })
});