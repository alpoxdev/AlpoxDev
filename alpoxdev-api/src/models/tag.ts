import {
    Entity,
    Index,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    ManyToMany,
    ManyToOne,
} from 'typeorm';

import Post from './post';

@Entity({ name: 'TAG' })
export default class Tag extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'text', nullable: false })
    public tag: string;

    @Column({ type: 'text', nullable: true })
    public description: string;

    @ManyToMany((type) => Post, (post) => post.tags)
    public posts: Post[];
}
