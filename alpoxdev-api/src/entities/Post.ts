import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    OneToMany,
    JoinTable
} from 'typeorm';

import { User, Tag } from './index';

@Entity()
export default class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'text' })
    public title: string;

    @Column({ type: 'text' })
    public content: string;

    @Column({ type: 'text', nullable: true })
    public thumbnail: string;

    @ManyToOne(type => User, { eager: true })
    public user: User;

    @ManyToMany(
        type => Tag,
        tag => tag.posts,
        { eager: true, onDelete: 'CASCADE' }
    )
    @JoinTable()
    public tags: Tag[];

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;
}
