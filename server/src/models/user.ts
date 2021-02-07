import {
    Table,
    Model,
    Column,
    CreatedAt,
    UpdatedAt,
    DataType,
    Default,
    DeletedAt,
    HasMany,
    BelongsToMany,
} from 'sequelize-typescript';

import { signToken } from '../services';

export enum UserRole {
    user = 'USER',
    admin = 'ADMIN',
}
@Table({
    tableName: 'user',
    timestamps: true,
})
export class User extends Model {
    @Column
    public nickname: string;

    @Column
    public email: string;

    @Column(DataType.TEXT)
    public profile: string;

    @Column(DataType.TEXT)
    hash: string;

    @Column(DataType.TEXT)
    salt: string;

    @Default(UserRole.user)
    @Column(DataType.ENUM(UserRole.user, UserRole.admin))
    public role: UserRole;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @DeletedAt
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
