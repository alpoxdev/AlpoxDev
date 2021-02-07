import {
    Table,
    Model,
    Column,
    DataType,
    Default,
    BelongsTo,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    ForeignKey,
    AllowNull,
    BelongsToMany,
    HasMany,
} from 'sequelize-typescript';

import { User, Comment, Category, Series, PostTag, Tag } from '.';

@Table({ tableName: 'post' })
export class Post extends Model {
    @Column(DataType.TEXT)
    public title: string;

    @AllowNull
    @Column(DataType.TEXT)
    public subtitle: string;

    @Column(DataType.TEXT)
    public content: string;

    @ForeignKey(() => User)
    @Column
    public userId: number;

    @BelongsTo(() => User)
    public user: User;

    @HasMany(() => Comment)
    public comments: Comment[];

    @ForeignKey(() => Category)
    @Column
    public categoryId: number;

    @BelongsTo(() => Category)
    public category: Category;

    @ForeignKey(() => Series)
    @Column
    public seriesId: number;

    @BelongsTo(() => Series)
    public series: Series;

    @BelongsToMany(() => Tag, () => PostTag)
    public tags: Tag[];

    @Default(0)
    @Column
    public views: number;

    @Default(false)
    @Column
    public public: boolean;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @DeletedAt
    public deletedAt: Date;
}
