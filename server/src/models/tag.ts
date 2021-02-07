import { Table, Model, Column, BelongsToMany } from 'sequelize-typescript';
import { Post } from './post';
import { PostTag } from './post_tag';

@Table({ tableName: 'tag', timestamps: false })
export class Tag extends Model {
    @Column
    public name: string;

    @BelongsToMany(() => Post, () => PostTag)
    public posts: Post[];
}
