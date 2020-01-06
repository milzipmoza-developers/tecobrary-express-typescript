import {sequelize} from "../../infra/database/sequelize";
import {LibraryBook, WishBook} from "../../infra/database/models";
import {calculate} from "../../common/utils/OffsetCalculator";
import {NotFoundWishBookError} from "../error";

const wishBookRepository = sequelize.getRepository(WishBook);
const libraryBookRepository = sequelize.getRepository(LibraryBook);

const getPageableWishBooks = async (page: number, limit: number) => {
    const offset = calculate(page, limit);
    const wishBooks = await wishBookRepository.findAll({offset, limit});
    const books = [];
    wishBooks.forEach(wishBook => {
        books.push(wishBook.get({plain: true}));
    });
    return books;
};

const enrollWishBook = async (id: number) => {
    const wishBook = await _getSavedWishBook(id);
    const savedLibraryBook = await _getSavedLibraryBook(wishBook);
    await wishBookRepository.destroy({where: {id}});
    return savedLibraryBook;
};

const deleteWishBook = async (id: number) => {
    const deletedBook = await wishBookRepository.destroy({where: {id}, force: true});
    if (deletedBook == 0) {
        throw new NotFoundWishBookError()
    }
    return deletedBook;
};

const _getSavedWishBook = async (id: number) => {
    const savedWishBook = await wishBookRepository.findOne({where: {id}});
    if (savedWishBook == null) {
        throw new NotFoundWishBookError()
    }
    return savedWishBook.get({plain: true});
};

const _getSavedLibraryBook = async (wishBook) => {
    const libraryBook = await libraryBookRepository.create({
        image: wishBook['image'],
        title: wishBook['title'],
        author: wishBook['author'],
        publisher: wishBook['publisher'],
        isbn: wishBook['isbn'],
        description: wishBook['isbn']
    });
    return libraryBook.get({plain: true});
};

export {
    getPageableWishBooks,
    enrollWishBook,
    deleteWishBook
}
