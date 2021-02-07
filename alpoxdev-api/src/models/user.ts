import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { signToken } from '../services';

export enum Role {
    USER = 'user',
    MEMBER = 'member',
    ADMIN = 'admin',
}

@Entity({ name: 'USER' })
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'text', nullable: true })
    public email: string;

    @Column({ nullable: true, type: 'varchar', length: '15' })
    public nickname: string;

    @Column({ nullable: true })
    public profile: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    public role: Role;

    @Column({ nullable: true })
    public hash: string;

    @Column({ nullable: true })
    public salt: string;

    @CreateDateColumn()
    public createdAt: Date;

    @DeleteDateColumn()
    public deletedAt: Date;

    public get accessToken() {
        return signToken({
            id: this.id,
            email: this.email,
            nickname: this.nickname,
            profile: this.profile,
        });
    }
}
