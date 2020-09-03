import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany
} from 'typeorm';

import ApickPost from './ApickPost';

@Entity({ name : 'APICK_TAG' })
export default class ApickTag extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id : number;

    @Column()
    public tag : string;

    @ManyToMany(
        type => ApickPost,
        post => post.tags
    )
    public posts : ApickPost[];
}