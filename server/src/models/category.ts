import {
    Table,
    Model,
    Column,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { User, Post } from '.';

@Table({ tableName: 'category', timestamps: false })
export class Category extends Model {
    @Column
    public name: string;

    @ForeignKey(() => User)
    @Column
    public userId: number;

    @BelongsTo(() => User)
    public user: User;

    @HasMany(() => Post)
    public posts: Post[];
}
