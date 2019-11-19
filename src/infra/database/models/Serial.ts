import {Column, CreatedAt, Model, Table, UpdatedAt} from "sequelize-typescript";
import {DataTypes} from "sequelize";

@Table({
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'Serials'
})
export class Serial extends Model<Serial> {

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