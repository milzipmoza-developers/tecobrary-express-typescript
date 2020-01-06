import {UpdateUserError} from "./UpdateUserError";

export class UpdateUserAuthorizationError extends UpdateUserError {
    constructor() {
        super("권한 업데이트 도중 오류가 발생하였습니다.");
    }
}