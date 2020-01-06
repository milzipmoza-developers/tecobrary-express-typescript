export class NotFoundSerialError implements Error {
    message: string;
    name: string;

    constructor() {
        this.message = '해당하는 일련번호가 존재하지 않습니다.';
    }
}