import { Request, Response, NextFunction } from 'express';

import { findUsers } from './index';

export const getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isError = errorHandler(req, res, next);
    if (isError) return isError;

    try {
        return await tryGetUsers(req, res, next);
    } catch (error) {
        return next({
            status: 500,
            route: 'GET /users'
        });
    }
};

const tryGetUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await findUsers();

    if (users) {
        return res.status(200).json({ users });
    } else {
        return next({
            status: 404,
            route: 'GET /users',
            message: 'NotFoundError : Users'
        });
    }
};

const errorHandler = (req: Request, res: Response, next: NextFunction) => {
    return false;
};
