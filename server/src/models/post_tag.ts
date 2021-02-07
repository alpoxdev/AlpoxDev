import { Table, Model, ForeignKey, Column } from 'sequelize-typescript';
import { Post } from './post';
import { Tag } from './tag';

@Table({ tableName: 'post_tag', timestamps: false })
export class PostTag extends Model {
    @ForeignKey(() => Post)
    @Column
    public postId: number;

    @ForeignKey(() => Tag)
    @Column
    public tagId: number;
}
