import { Request, Response, NextFunction } from 'express';
import { User } from '../entities';

export const OnlyAdminMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { user } = req;

    if (user && user.role === 'admin') {
        return next();
    } else {
        return next({
            status: 400,
            route: 'Middleware : Only Admin',
            message: 'Authorization Failure : No Permission'
        });
    }
};
