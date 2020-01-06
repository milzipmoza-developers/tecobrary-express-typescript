export class NotFoundSerialTargetError implements Error {
    message: string;
    name: string;

    constructor() {
        this.message = "해당하는 책이 존재하지 않습니다.";
    }
}