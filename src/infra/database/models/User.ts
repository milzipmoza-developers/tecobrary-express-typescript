import {AutoIncrement, Column, DataType, Default, IsUrl, Length, Model, PrimaryKey, Table} from 'sequelize-typescript';
import {Authorization} from "../../../common/Authorization";

@Table({
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'Users'
})
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        primaryKey: true,
        allowNull: false
    })
    public id: number;

    @Length({max: 100})
    @Column({
        type: DataType.STRING(100),
        unique: true,
        allowNull: false
    })
    public githubId: string;

    @Length({max: 100})
    @Column({
        type: DataType.STRING(100),
        allowNull: false
    })
    public email: string;

    @Length({max: 100})
    @Column({
        type: DataType.STRING(100),
        allowNull: true
    })
    public name?: string;

    @IsUrl
    @Length({max: 255})
    @Column({
        type: DataType.STRING(255),
        allowNull: false
    })
    public avatarUrl: string;

    @Default(Authorization.NONE)
    @Column({
        type: DataType.ENUM(Authorization.NONE, Authorization.USER, Authorization.MANAGER, Authorization.KING),
        allowNull: false
    })
    public authorization: 'NONE' | 'USER' | 'MANAGER' | 'GOD';
}

