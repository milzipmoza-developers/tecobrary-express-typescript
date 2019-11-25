import * as LibraryBookService from "../../src/librarybook/service/LibraryBookService";

export const rollbackLibraryBook = async (id: number) => {
    await LibraryBookService.deleteBookById(id);
};