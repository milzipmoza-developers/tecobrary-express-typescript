export class LibraryBookVo {
    private readonly _image: string;
    private readonly _title: string;
    private readonly _author: string;
    private readonly _publisher: string;
    private readonly _isbn: string;
    private readonly _description: string;

    constructor(image: string, title: string, author: string, publisher: string, isbn: string, description: string) {
        this._image = image;
        this._title = title;
        this._author = author;
        this._publisher = publisher;
        this._isbn = isbn;
        this._description = description;
    }


    get image(): string {
        return this._image;
    }

    get title(): string {
        return this._title;
    }

    get author(): string {
        return this._author;
    }

    get publisher(): string {
        return this._publisher;
    }

    get isbn(): string {
        return this._isbn;
    }

    get description(): string {
        return this._description;
    }
}