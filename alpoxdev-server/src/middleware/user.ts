import { Request, Response, NextFunction } from 'express';

export const OnlyMyselfMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { user } = req;
    const id = req.params.id || req.query.id;

    if (user.role === 'admin') {
        return next();
    }
    if (user && `${user.id}` === id) {
        return next();
    }
    return next({
        status: 401,
        route: 'OnlyMyself Middleware',
        message: 'Authorization Failure : No Permission'
    });
};
