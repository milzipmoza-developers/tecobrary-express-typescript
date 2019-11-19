import {Column, Model, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@Table({
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'LibraryBooks'
})
export class LibraryBook extends Model<LibraryBook>{

    @Column({
        type: DataTypes.STRING(255),
        allowNull: true,
    })
    image: string;

    @Column({
        type: DataTypes.STRING(255),
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataTypes.STRING(255),
        allowNull: false
    })
    author: string;

    @Column({
        type: DataTypes.STRING(255),
        allowNull: true,
    })
    publisher: string;

    @Column({
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    })
    isbn: string;

    @Column({
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '내용 없음'
    })
    desc: string;
}