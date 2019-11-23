import {parseToNumber} from "../../../src/common/utils/stringParser";
import {CannotParseToNumberError} from "../../../src/common/utils/error";

describe('stringParser 테스트', () => {
    test('parseToNumber 성공', () => {
        const stringTypeNumber = '1';
        const parsedNumber = parseToNumber(stringTypeNumber);
        expect(typeof parsedNumber === 'number')
            .toBe(true);
    });

    test('parseToNumber 실패, 문자열', () => {
        const stringTypeNumber = 'd';
        expect(() => parseToNumber(stringTypeNumber))
            .toThrowError(CannotParseToNumberError);
    });
});