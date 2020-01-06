import {sequelize} from "../../infra/database/sequelize";
import {LibraryBook, Serial} from "../../infra/database/models";
import {NotFoundSerialError, NotFoundSerialTargetError} from "../error";

const libraryBookRepository = sequelize.getRepository(LibraryBook);
const serialRepository = sequelize.getRepository(Serial);

export const findSerialsByBookId = async (bookId: number) => {
    const savedSerials = await serialRepository.findAll(
        {
            where: {bookId},
            attributes: ['serialNumber', 'status']
        });
    const serials = [];
    savedSerials.forEach(serial => {
        serials.push(serial.get({plain: true}))
    });
    return serials;
};

export const createSerial = async (serialNumber: number, bookId: number) => {
    const targetBook = await libraryBookRepository.findOne({where: {id: bookId}});
    if (targetBook === null) {
        throw new NotFoundSerialTargetError();
    }
    const savedSerial = await serialRepository.create({serialNumber, bookId});
    return savedSerial.get({plain: true});
};

export const deleteSerial = async (serialNumber: number) => {
    const removedBook = await serialRepository.destroy({where: {serialNumber}});
    if (removedBook === 0) {
        throw new NotFoundSerialError();
    }
    return true;
};