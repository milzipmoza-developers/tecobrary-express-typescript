export class AlreadyReturnedSerialError implements Error {
    message: string;
    name: string;

    constructor() {
        this.message = '반납 상태의 도서입니다.';
    }
}