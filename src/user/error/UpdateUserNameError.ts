import {UpdateUserError} from "./UpdateUserError";

export class UpdateUserNameError extends UpdateUserError {
    constructor() {
        super("이름 업데이트 도중 오류가 발생하였습니다.");
    }
}