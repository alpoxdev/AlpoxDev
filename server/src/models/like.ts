import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { Post } from './post';
import { User } from './user';

@Table({ tableName: 'like', timestamps: false })
export class Like extends Model {
    @ForeignKey(() => Post)
    @Column
    public postId: number;

    @ForeignKey(() => User)
    @Column
    public userId: number;
}
