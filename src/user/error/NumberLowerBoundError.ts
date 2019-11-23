export class NumberLowerBoundError implements Error {
    message: string;
    name: string;

    constructor() {
        this.message = "범위는 0이상 입니다."
    }
}
