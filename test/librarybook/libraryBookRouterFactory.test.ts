import {app} from "../../src/app";
import {rollbackLibraryBook} from "./LibraryRespositoryUtils";

const request = require('supertest');

const _STATUS_CODE = {
    BAD_REQUEST: 400,
    OK: 200,
};

describe('libraryBookRouterFactory 테스트', () => {
    test('[GET] /books?page=1&number=10 요청에 성공한다.', async () => {
        const res = await request(app)
            .get('/books')
            .query({page: '1', number: '10'})
            .send();

        expect(res.statusCode).toBe(_STATUS_CODE.OK);
        expect(res.body.length).toBe(10);
    });

    test('[GET] /books, page 가 문자열일 때 Bad Request', async () => {
        const res = await request(app)
            .get('/books')
            .query({page: 'a', number: '10'})
            .send();

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
    });

    test('[GET] /books, number 가 문자열일 때 Bad Request', async () => {
        const res = await request(app)
            .get('/books')
            .query({page: '1', number: 'a'})
            .send();

        expect(res.statusCode).toBe(_STATUS_CODE.BAD_REQUEST);
    });

    test('[GET] /books/all 요청에 성공한다.', async () => {
        const res = await request(app)
            .get('/books/all')
            .send();

        expect(res.statusCode).toBe(200);
        expect(res.body.total).toBe(95)
    });
    
    test('[GET] /books/:id 요청에 성공한다.', async () => {
        const res = await request(app)
            .get('/books/1')
            .send();

        const book = res.body;
        expect(res.statusCode).toBe(200);
        expect(book.id).toBe(1);
        expect(book.image).toBe('https://bookthumb-phinf.pstatic.net/cover/091/459/09145968.jpg?type=m1&udate=20171011');
        expect(book.title).toBe('객체지향의 사실과 오해 (역할, 책임, 협력 관점에서 본 객체지향)');
        expect(book.author).toBe('조영호');
        expect(book.publisher).toBe('위키북스');
        expect(book.isbn).toBe('8998139766 9788998139766');
        expect(book.description.length).not.toBe(0);
    });

    test('[GET] /books/:id 문자열 id 로 요청하면 Bad Request', async () => {
        const res = await request(app)
            .get('/books/aa')
            .send();

        expect(res.statusCode).toBe(400);
    });

    test('[GET] /books/:id 없는 id 로 요청하면 Bad Request', async () => {
        const res = await request(app)
            .get('/books/1234')
            .send();

        expect(res.statusCode).toBe(400);
    });

    test('[GET] /books/search 도서 검색에 성공한다.', async () => {
        const res = await request(app)
            .get('/books/search')
            .query({title: '객', page: '1', number: '10'})
            .send();

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(9);
    });

    test('[GET] /books/search, page 와 number 가 누락되면 Bad Request', async () => {
        const res = await request(app)
            .get('/books/search')
            .query({title: '객'})
            .send();

        expect(res.statusCode).toBe(400);
    });

    test('[POST] /books 도서 저장에 성공한다.', async () => {
        const res = await request(app)
            .post('/books')
            .send({
                image: 'https://image.url',
                title: '나도 책이다.',
                author: '개발왕루피',
                publisher: '우아한테크코스',
                isbn: '19930705',
                description: '이 책이야 말로 구매해서 봐야 아는 책이다. 요약 설명은 생략한다.'
            });

        expect(res.status).toBe(200);
        expect(res.body.message).toBe('나도 책이다. register succeed');

        await rollbackLibraryBook(res.body.id);
    });

    test('[POST] /books isbn 이 같은 도서 저장을 시도하면 Bad Request', async () => {
        const res = await request(app)
            .post('/books')
            .send({
                image: 'https://image.url',
                title: '나도 책이다.',
                author: '개발왕루피',
                publisher: '우아한테크코스',
                isbn: '8998139766 9788998139766',
                description: '이 책이야 말로 구매해서 봐야 아는 책이다. 요약 설명은 생략한다.'
            });

        expect(res.status).toBe(400);
        expect(res.body.message).toBe("already enrolled book");
    });
});