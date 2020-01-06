export class NotFoundLibraryBookError implements Error {
    message: string;
    name: string;

    constructor() {
        this.message = '해당 도서를 찾을 수 없습니다.';
    }
}
