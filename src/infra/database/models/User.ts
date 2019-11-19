import {AutoIncrement, Column, DataType, Default, IsUrl, Length, Model, PrimaryKey, Table} from 'sequelize-typescript';

@Table({
    timestamps: true,
    charset: 'utf8',
    collate: 'utf8_general_ci',
    tableName: 'User'
})
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column({primaryKey: true, allowNull: false})
    public id?: number;

    @Length({max: 100})
    @Column({unique: true, allowNull: false})
    public github_id: string;

    @Length({max: 100})
    @Column({allowNull: false})
    public email: string;

    @Length({max: 100})
    @Column({allowNull: true})
    public name?: string;ø

    @IsUrl
    @Length({max: 255})
    @Column({allowNull: false})
    public avatar_url: string;

    @Default('none')
    @Column(DataType.ENUM('none', 'user', 'manager', 'god'))
    public authorization: any;
}

