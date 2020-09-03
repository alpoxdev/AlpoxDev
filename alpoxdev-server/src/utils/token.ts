import { sign, verify } from 'jsonwebtoken';
import { secret, issuer, expiresIn } from '../config/jwt.config.json';

import { User } from '../entities';

export interface ICreateToken {
    email?: string;
    social?: string;
}

export const createToken = ({ email = null, social = null }: ICreateToken) => {
    if (!email && !social) return null;

    const token = sign({ email, social }, secret, { issuer, expiresIn });
    return token;
};

export const validateToken = (token: string | null) => {
    if (!token) return null;

    try {
        const payload: any = verify(token, secret, { issuer });
        return payload;
    } catch (error) {
        return 'expired';
    }
};
