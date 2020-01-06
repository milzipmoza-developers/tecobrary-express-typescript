import {AutoIncrement, Column, Model, PrimaryKey, Table} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@Table({
    timestamps: true,
    paranoid: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'RentHistories'
})
export class RentHistory extends Model<RentHistory> {

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
    })
    serialId: number;

    @Column({
        type: DataTypes.INTEGER,
        allowNull: false,
    })
    userId: number;
}