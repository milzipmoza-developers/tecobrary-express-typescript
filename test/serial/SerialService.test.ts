import * as SerialService from "../../src/serial/service/SerialService";
import {NotFoundSerialTargetError} from "../../src/serial/error";

const NON_EXIST_BOOK_ID = 1000;
const EXIST_BOOK_ID = 9;
const NEW_SERIAL = 300;
const EXIST_SERIAL = 1;

describe('SerialSerivce 테스트', () => {

    test('findSerialsBookId 가 성공적으로 동작한다.', async () => {
        const serials = await SerialService.findSerialsByBookId(EXIST_BOOK_ID);

        await expect(serials.length).toBe(4);
    });

    test('존재하지 않는 Book Id 에 대해서 findSerialsBookId 가 성공적으로 동작한다.', async () => {
        const serials = await SerialService.findSerialsByBookId(NON_EXIST_BOOK_ID);

        await expect(serials.length).toBe(0);
    });

    test('createSerial 이 성공적으로 동작한다.', async () => {
        const savedSerial = await SerialService.createSerial(NEW_SERIAL, EXIST_BOOK_ID);
        await expect(savedSerial['serialNumber']).toBe(NEW_SERIAL);

        // rollback
        await SerialService.deleteSerial(NEW_SERIAL);
    });

    test('존재하지 않는 BookId 에 대하여 createSerial 이 NotFoundSerialTargetError 를 발생시킨다.', async () => {
        await expect(SerialService.createSerial(NEW_SERIAL, NON_EXIST_BOOK_ID))
            .rejects
            .toEqual(new NotFoundSerialTargetError());
    });

    test('이미 존재하는 serial 에 대하여 createSerial 이 에러를 발생시킨다.', async () => {
        await expect(SerialService.createSerial(EXIST_SERIAL, EXIST_BOOK_ID))
            .rejects
            .toBeInstanceOf(Error)
    });
});