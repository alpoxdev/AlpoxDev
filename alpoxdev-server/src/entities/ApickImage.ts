import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable
} from 'typeorm';

import ApickPost from './ApickPost';

@Entity({ name : 'APICK_IMAGE'})
export default class ApickImage extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id : number;

    @Column({ type : 'text' })
    public url : string;

    @ManyToOne(
        type => ApickPost,
        post => post.images
    )
    public post : ApickPost;
}