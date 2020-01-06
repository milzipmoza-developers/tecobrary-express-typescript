export class CannotParseToNumberError implements Error {
    message: string;
    name: string;

    constructor() {
        this.message = '숫자로 파싱할 수 없습니다.';
    }
}