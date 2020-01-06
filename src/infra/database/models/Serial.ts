import {AutoIncrement, Column, CreatedAt, Model, PrimaryKey, Table, UpdatedAt} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@Table({
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'Serials'
})
export class Serial extends Model<Serial> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        primaryKey: true,
        allowNull: false
    })
    id: number;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    })
    serialNumber: number;

    @Column({
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    status: boolean;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
    })
    bookId: number;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}