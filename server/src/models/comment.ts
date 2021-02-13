import {
    Table,
    Model,
    Column,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Post } from './post';
import { User } from './user';

@Table({ tableName: 'comment' })
export class Comment extends Model {
    @Column(DataType.TEXT)
    content: string;

    @ForeignKey(() => User)
    @Column
    public userId: number;

    @BelongsTo(() => User)
    public user: User;

    @ForeignKey(() => Post)
    @Column
    public postId: number;

    @BelongsTo(() => Post)
    public post: Post;
}
