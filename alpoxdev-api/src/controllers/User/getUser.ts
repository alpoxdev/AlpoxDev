import { Request, Response, NextFunction } from 'express';
import { findUser } from './user';
import { GET_USER } from '../routes';
import { NotFound, NoPermission } from '../message';

export const getUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isError = errorHandler(req, res, next);
    if (isError) return isError;

    try {
        return await tryGetUser(req, res, next);
    } catch (error) {
        return next({
            status: 500,
            route: GET_USER
        });
    }
};

const tryGetUser = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const findOptions = {
        where: { id },
        relations: ['userHistorys']
    };
    const user = await findUser(findOptions);
    if (user) {
        return res.status(200).json({ user });
    } else {
        return next({
            status: 404,
            route: GET_USER,
            message: NotFound('user')
        });
    }
};

const errorHandler = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { id } = req.params;

    if (user.role === 'admin') return false;

    if (`${user.id}` !== `${id}`) {
        return next({
            status: 401,
            route: GET_USER,
            message: NoPermission('No Permission')
        });
    }

    return false;
};
