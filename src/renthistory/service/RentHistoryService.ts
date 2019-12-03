import {sequelize} from "../../infra/database/sequelize";
import {LibraryBook, RentHistory, Serial, User} from "../../infra/database/models";
import {calculate} from "../../common/utils/OffsetCalculator";
import {NotFoundSerialError} from "../../serial/error";
import {AlreadyRentSerialError, AlreadyReturnedSerialError} from "../error";

const rentHistoryRepository = sequelize.getRepository(RentHistory);
const serialRepository = sequelize.getRepository(Serial);
const libraryBookRepository = sequelize.getRepository(LibraryBook);
const userRepository = sequelize.getRepository(User);

const userRents = async (userId: number) => {
    const rentStatus = await rentHistoryRepository.findAll({where: {userId}});
    return await _getUserRents(rentStatus);
};

const _getUserRents = async (rentStatus) => {
    const userRents = [];

    for (let i = 0; i < rentStatus.length; i++) {
        const rent = rentStatus[i].get({plain: true});
        const {serialId} = rent;

        const serial = await serialRepository.findOne({where: {serialNumber: serialId}});
        const book = await libraryBookRepository.findOne({where: {id: serial.bookId}});

        userRents.push({
            id: rent.id,
            serial: serial.serialNumber,
            title: book.title,
            userId: rent.userId,
            rentDate: rent.createdAt
        })
    }

    return userRents;
};

const allUserRents = async (page: number, limit: number) => {
    const offset = calculate(page, limit);
    const allUserRents = await rentHistoryRepository.findAll({offset, limit});
    const userRents = await _getAllUserRents(allUserRents);
    return userRents;
};

const _getAllUserRents = async (allUserRents) => {
    const userRents = [];

    for (let i = 0; i < allUserRents.length; i++) {
        const rent = allUserRents[i].get({plain: true});
        const {serialId, userId} = rent;

        const user = await userRepository.findOne({where: {id: userId}});
        const serial = await serialRepository.findOne({where: {serialNumber: serialId}});
        const book = await libraryBookRepository.findOne({where: {id: serial.bookId}});

        userRents.push({
            id: rent.id,
            userName: user.name,
            title: book.title,
            serial: serialId,
            rentDate: rent.createdAt
        })
    }
    return userRents;
};

const rentBook = async (serialNumber: number, userId: number) => {
    const serial = await serialRepository.findOne({where: {serialNumber}});
    if (serial == null) {
        throw new NotFoundSerialError();
    }
    if (serial.status == true) {
        throw new AlreadyRentSerialError();
    }
    const book = await libraryBookRepository.findOne({where: {id: serial.bookId}});
    const rent = await rentHistoryRepository.create({
        serialId: serialNumber,
        userId
    });
    await serialRepository.update({status: true}, {where: {serialNumber}});
    return {
        book: book.get({plain: true}),
        rent: rent.get({plain: true})
    }
};

const returnBook = async (serialNumber: number) => {
    const serial = await serialRepository.findOne({where: {serialNumber}});
    if (serial == null) {
        throw new NotFoundSerialError();
    }
    if (serial.status == false) {
        throw new AlreadyReturnedSerialError();
    }
    const book = await libraryBookRepository.findOne({where: {id: serial.bookId}});
    await rentHistoryRepository.destroy({where: {serialId: serialNumber}});
    await serialRepository.update({status: false}, {where: {serialNumber}});
    return {book: book.get({plain: true})}
};

export {
    userRents,
    allUserRents,
    rentBook,
    returnBook
}