import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany
} from 'typeorm';

import ApickPost from './ApickPost';

@Entity({ name : 'APICK_PRODUCT' })
export default class ApickProduct extends BaseEntity{
    @PrimaryGeneratedColumn()
    public id : number;

    @Column()
    public type : string;

    @Column()
    public name : string;
    
    @Column()
    public price : string;
    
    @Column({ type : 'text' })
    public link : string;

    @ManyToMany(
        type => ApickPost,
        post => post.products
    )
    public posts : ApickPost[];
}