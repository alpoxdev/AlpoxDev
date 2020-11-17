import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

interface TokenPayload {
    id: number;
    email: string;
    nickname: string;
    profile?: string;
}

const signToken = (userPayload: TokenPayload) => {
    const token = jwt.sign(userPayload, JWT_SECRET);
    return token;
};

const verifyToken = (token: string) => {
    try {
        const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
        if (payload) return payload;

        throw { status: 401, message: 'Invalid Token' };
    } catch (error) {
        throw { status: 401, message: 'Invalid Token' };
    }
};

export { TokenPayload, signToken, verifyToken };
