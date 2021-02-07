import {
    Table,
    Model,
    Column,
    HasMany,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Post } from './post';
import { User } from './user';

@Table({ tableName: 'series', timestamps: false })
export class Series extends Model {
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
