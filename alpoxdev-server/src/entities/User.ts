import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinColumn,
    JoinTable,
    RelationCount,
    CreateDateColumn,
    DeleteDateColumn,
    Generated
} from 'typeorm';

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

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

    @Column({ nullable: true, type : 'varchar', length : "15" }) // 닉네임 15자로 제한
    public nickname: string;

    @Column({ nullable: true })
    public profile: string;

    @Column({ type : 'varchar', length : "15" }) // 010-0000-0000 13자 => 여유롭게 15자로 제한
    public phone: string;

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

    @CreateDateColumn()
    public createdAt: Date;
}
