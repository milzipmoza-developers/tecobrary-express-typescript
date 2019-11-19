import {AutoIncrement, Column, DataType, Default, IsUrl, Length, Model, PrimaryKey, Table} from 'sequelize-typescript';

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

    @Default('none')
    @Column({
        type: DataType.ENUM('none', 'user', 'manager', 'god'),
        allowNull: false
    })
    public authorization: 'none' | 'user' | 'manager' | 'god';
}

