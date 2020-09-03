import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from 'typeorm';

import ApickPost from './ApickPost';

@Entity({ name : 'APICK_USER' })
export default class ApickUser extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id : number;

    @OneToMany(
        type => ApickPost,
        post => post.user
    )
    public posts : ApickPost[];

    @Column({ nullable : true })
    public height : number;

    @Column({ nullable : true })
    public weight : number;

    @Column({ type : 'text', nullable : true })
    public bodyForm : string;

    @Column({ nullable : true })
    public instagramId : string;

    @Column({ nullable : true })
    public instagramLink : string;
}