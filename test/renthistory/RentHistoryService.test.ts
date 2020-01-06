import * as RentHistoryService from "../../src/renthistory/service/RentHistoryService";

describe('RentHistoryService 테스트', () => {

    test('userRents 가 성공적으로 특정 유저의 rent 목록을 반환한다.', async () => {
        const userRents = await RentHistoryService.userRents(12);

        await expect(userRents.length).toBe(2);
        await expect(userRents[0].serial).toBe(100);
        await expect(userRents[1].serial).toBe(82);
    });

    test('allUserRents 가 성공적으로 모든 유저의 rent 목록을 반환한다.', async () => {
        const allUserRents = await RentHistoryService.allUserRents(1, 4);

        await expect(allUserRents.length).toBe(4);
    });

    test('rentBook 이 성공적으로 대여를 처리한다.', async () => {
        const rentBook = await RentHistoryService.rentBook(133, 1);

        await expect(rentBook.book['title']).toBe('스프링5 레시피 (스프링 애플리케이션 개발에 유용한 161가지 문제 해결 기법)');
        await expect(rentBook.rent['createdAt']).not.toBeNull();
    });

    test('rentBook 이 성공적으로 반납을 처리한다.', async () => {
        const returnBook = await RentHistoryService.returnBook(133);

        await expect(returnBook.book['title']).toBe('스프링5 레시피 (스프링 애플리케이션 개발에 유용한 161가지 문제 해결 기법)');
    });
});