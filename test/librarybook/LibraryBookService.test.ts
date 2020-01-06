import * as LibraryBookService from "../../src/librarybook/service/LibraryBookService";
import {LibraryBookVo} from "../../src/librarybook/LibraryBookVo";

describe('LibraryBookService 테스트', () => {

    test('findById 가 성공적으로 LibraryBook 을 반환한다.', async () => {
        const savedBook: Object = await LibraryBookService.findById(1);
        await expect(savedBook['id']).toBe(1);
        await expect(savedBook['image']).toBe('https://bookthumb-phinf.pstatic.net/cover/091/459/09145968.jpg?type=m1&udate=20171011');
        await expect(savedBook['title']).toBe('객체지향의 사실과 오해 (역할, 책임, 협력 관점에서 본 객체지향)');
        await expect(savedBook['author']).toBe('조영호');
        await expect(savedBook['publisher']).toBe('위키북스');
        await expect(savedBook['isbn']).toBe('8998139766 9788998139766');
        await expect(savedBook['description']).not.toBeNull();
    });

    test('getTotalNumber 가 성공적으로 총 LibraryBook 수를 반환하다.', async () => {
        const total: number = await LibraryBookService.getTotalNumber();
        await expect(total).toBe(95);
    });

    test('getPageableBooks 메서드가 페이지 1에서 10개씩 뽑아온다.', async () => {
        const list: Array<Object> = await LibraryBookService.getPageableBooks(1, 10);
        await expect(list.length).toBe(10);
    });

    test('createBook 이 성공적으로 책을 생성한다.', async () => {
        const libraryBook = new LibraryBookVo(
            'https://image.url',
            '이것은 책이다.',
            '개발왕루피',
            '우아한테크코스',
            '19930705',
            '개발왕 루피의 첫 집필 도서, 궁금한 내용은 구매해서 보시라.'
        );
        const createdBook = await LibraryBookService.createBook(libraryBook);
        await expect(createdBook['id']).not.toBeNull();
        await expect(createdBook['image']).toBe('https://image.url');
        await expect(createdBook['title']).toBe('이것은 책이다.');
        await expect(createdBook['author']).toBe('개발왕루피');
        await expect(createdBook['publisher']).toBe('우아한테크코스');
        await expect(createdBook['isbn']).toBe('19930705');
        await expect(createdBook['description']).toBe('개발왕 루피의 첫 집필 도서, 궁금한 내용은 구매해서 보시라.');

        await LibraryBookService.deleteBookById(createdBook['id']);
    });

    test('searchBooks 가 정상적으로 검색 결과를 반환한다.', async () => {
        const searchBooks = await LibraryBookService.searchBooks('객', 1, 10);
        await expect(searchBooks.length).toBe(9);
    });
});