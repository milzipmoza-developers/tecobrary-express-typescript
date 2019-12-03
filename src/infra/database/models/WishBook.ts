import {AutoIncrement, Column, IsUrl, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@Table({
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'WishBooks'
})
export class WishBook extends Model<WishBook> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        primaryKey: true,
        allowNull: false
    })
    public id: number;

    @IsUrl
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
    description: string;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false
    })
    userId: number;
}