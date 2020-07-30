import { Request, Response, NextFunction } from 'express';

import User from '../entities/User';
import { validateToken, createSocialHash } from '../utils';

export const AuthMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const payload = getPayload(req);
    if (payload === 'expired') {
        return next({
            status: 401,
            route: 'Auth Middleware',
            message: 'JWT Expired'
        });
    }
    if (!payload) {
        return next({
            status: 401,
            route: 'Auth Middleware',
            message: 'Authorization Failure'
        });
    }

    const { email, social } = payload;
    if (email) {
        const user = await getUserByEmail(email);
        req.user = user;
        return next();
    }

    if (social) {
        const user = await getUserBySocial(social);
        req.user = user;
        return next();
    }

    return next({
        status: 401,
        route: 'AuthMiddleware',
        message: 'Authorization Failure'
    });
};

export const getPayload = (req: Request) => {
    const authorization = getHeaderAuthorization(req);
    const [bearer, accessToken] = authorization
        ? authorization.split(' ')
        : [null, null];

    const payload = validateToken(accessToken);
    return payload ? payload : null;
};

const getHeaderAuthorization = (req: Request) => {
    const authorization = req.headers ? req.headers.authorization : null;
    return authorization;
};

const getUserByEmail = async (email: string) => {
    const user = await User.findOne({ where: { email } });
    return user ? user : null;
};

const getUserBySocial = async (socialId: string, socialType: string = null) => {
    const user = await User.findOne({
        where: { socialId }
    });

    return user ? user : null;
};
