import {sequelize} from "../../infra/database/sequelize";
import {LibraryBook} from "../../infra/database/models";
import {calculate} from "../../common/utils/OffsetCalculator";
import {LibraryBookVo} from "../LibraryBookVo";
import {NotFoundLibraryBookError} from "../error";
import {Op} from "sequelize";

const libraryBookRepository = sequelize.getRepository(LibraryBook);

export const findById = async (id: number) => {
    const savedBook = await libraryBookRepository.findOne({where: {id}})
    if (savedBook === null) {
        throw new NotFoundLibraryBookError();
    }
    return savedBook.get({plain: true});
};

export const createBook = async (book: LibraryBookVo) => {
    const savedBook = await libraryBookRepository.create({
        image: book.image,
        title: book.title,
        author: book.author,
        publisher: book.publisher,
        isbn: book.isbn,
        description: book.description
    });
    return savedBook.get({plain: true});
};

export const deleteBookById = async (id: number) => {
    const deletedBook = await libraryBookRepository.destroy({where: {id}});
    return deletedBook;
};

export const getTotalNumber = async () => {
    const books = await libraryBookRepository.findAll({attributes: ['id']});
    return books.length;
};

export const getPageableBooks = async (page: number, limit: number) => {
    const offset = calculate(page, limit);
    const savedBooks = await libraryBookRepository.findAll({offset, limit});
    const books = [];
    savedBooks.forEach(book => {
        books.push(book.get({plain: true}));
    });
    return books;
};

export const searchBooks = async (title: string, page: number, limit: number) => {
    const offset = calculate(page, limit);
    const searchedBooks = await libraryBookRepository.findAll({
        attributes: ['id', 'title'],
        where: {
            title: {
                [Op.like]: "%" + title + "%"
            }
        },
        limit,
        offset
    });
    const books = [];
    searchedBooks.forEach(book => {
        books.push(book.get({plain: true}));
    });
    return books;
};
