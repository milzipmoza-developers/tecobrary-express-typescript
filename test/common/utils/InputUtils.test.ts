import {parseToNumber} from "../../../src/common/utils/InputUtils";
import {CannotParseToNumberError} from "../../../src/common/utils/error";

describe('InputUtils 테스트', () => {
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