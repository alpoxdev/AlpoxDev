import { Request, Response, NextFunction } from 'express';
import { User } from '../../entities';

import { ErrorHandler, createToken, createUUID } from '../../utils';
import { TRY_REFRESH_AUTH as route } from '../routes';
import { BadRequest, NotFound } from '../message';

export const refreshAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isError = errorHandler(req, res, next);
    if (isError) return isError;

    try {
        return await tryRefreshAuth(req, res, next);
    } catch (error) {
        return next({
            status: 500,
            route
        });
    }
};

const tryRefreshAuth = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { refreshToken } = req.body;

    const user = await User.findOne({
        where: { refreshToken }
    });

    if (!user) {
        return next({
            status: 404,
            route,
            message: NotFound('user')
        });
    }

    // new refreshToken, accessToken
    const refresh = createUUID();
    const accessToken = createToken({ email: user.email });

    user.refreshToken = refresh;
    await User.save(user);

    return res.status(201).json({ accessToken, refreshToken: refresh });
};

const errorHandler = (req: Request, res: Response, next: NextFunction) => {
    const { refreshToken } = req.body;

    const isRequired = ErrorHandler.isRequiredExist({ refreshToken });
    if (isRequired.length > 0) {
        return next({
            status: 400,
            route,
            message: BadRequest({ isRequired })
        });
    }

    return false;
};
