import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany
} from 'typeorm';

import ApickUser from './ApickUser';
import ApickImage from './ApickImage';
import ApickProduct from './ApickProduct';
import ApickTag from './ApickTag';

@Entity({ name : 'APICK_POST' })
export default class ApickPost extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id : number;

    @Column({ type : 'text' })
    public link : string;

    @Column({ type : 'text' })
    public thumbnail : string;

    @Column({ type : 'text' })
    public pickerComment : string;
    
    @ManyToOne(
        type => ApickUser,
        user => user.posts,
        { nullable : true }
    )
    public user : ApickUser;

    @OneToMany(
        type => ApickImage,
        image => image.post,
        { nullable : true }
    )
    public images : ApickImage[];

    @ManyToMany(
        type => ApickProduct,
        product => product.posts
    )
    @JoinTable({ name : 'APICK_POST_PRODUCT' })
    public products : ApickProduct[];

    @ManyToMany(
        type => ApickTag,
        tag =>  tag.posts,
        { eager : true, nullable : true }
    )
    @JoinTable({ name : 'APICK_POST_TAG' })
    public tags : ApickTag[];
}
