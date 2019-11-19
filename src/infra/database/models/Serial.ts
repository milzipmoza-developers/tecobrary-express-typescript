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
    @Column({
        primaryKey: true,
        allowNull: false
    })
    public id: number;

    @Column({
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    status: boolean;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;
}