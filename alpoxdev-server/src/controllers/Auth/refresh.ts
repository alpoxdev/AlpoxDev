import { Request, Response, NextFunction } from 'express';
import { User } from '../../entities';

import { AUTH_REFRESH as route } from '../routes';
import { BadRequest } from '../messages';
import { createToken, createUUID } from '../../utils';

export const refresh = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return await tryRefresh(req, res, next);
    } catch (error) {
        return next({
            status: 500,
            route
        });
    }
};

const tryRefresh = async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { refreshToken } = req.body;

    if (user && user.refreshToken !== refreshToken) {
        next({
            status: 400,
            route,
            message: BadRequest('Incorrect refreshToken')
        });
    }

    // new refreshToken, accessToken
    const refresh = createUUID();
    const accessToken = createToken({
        email: user.email,
        social: user.socialId
    });

    user.refreshToken = refresh;
    await User.save(user);

    return res.status(201).json({ accessToken, refreshToken: refresh });
};
