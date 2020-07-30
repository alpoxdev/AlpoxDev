import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Generated,
    BaseEntity,
    OneToMany
} from 'typeorm';

export enum SocialType {
    DEFAULT = 'default',
    KAKAO = 'kakao',
    GOOGLE = 'google'
}

export enum Role {
    USER = 'user',
    ADMIN = 'admin'
}

@Entity({ name: 'USER' })
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ type: 'text', nullable: true })
    public email: string;

    @Column({ nullable: true })
    public nickname: string;

    @Column({ nullable: true })
    public profile: string;

    @Column({ type: 'enum', enum: SocialType, default: SocialType.DEFAULT })
    public socialType: SocialType;

    @Column({ nullable: true })
    public socialId: string;

    @Column({ type: 'enum', enum: Role, default: Role.USER })
    public role: Role;

    @Column({ nullable: true })
    public hash: string;

    @Column({ nullable: true })
    public salt: string;

    @Column()
    @Generated('uuid')
    public refreshToken: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    public createdAt: Date;
}
