export class NotFoundUserError implements Error {
    message: string;
    name: string;

    constructor() {
        this.message = "해당하는 유저를 찾을 수 없습니다."
    }
}
