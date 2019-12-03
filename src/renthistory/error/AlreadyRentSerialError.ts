export class AlreadyRentSerialError implements Error {
    message: string;
    name: string;

    constructor() {
        this.message = '이미 대여 중인 도서입니다.';
    }
}