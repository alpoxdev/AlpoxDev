import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    CreateDateColumn,
    DeleteDateColumn,
} from 'typeorm';

import { User, Tag } from './models';

@Entity({ name: 'POST' })
export default class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'text' })
    public title: string;

    @Column({ type: 'text' })
    public content: string;

    @Column({ type: 'text', nullable: true })
    public thumbnail: string;

    @ManyToOne((type) => User, { eager: true })
    public user: User;

    @ManyToMany((type) => Tag, (tag) => tag.posts, {
        eager: true,
        onDelete: 'CASCADE',
    })
    @JoinTable({ name: 'POST_TAG' })
    public tags: Tag[];

    @CreateDateColumn()
    public createdAt: Date;

    @DeleteDateColumn()
    public deletedAt: Date;
}
