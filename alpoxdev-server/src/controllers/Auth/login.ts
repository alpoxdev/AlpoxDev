import { Request, Response, NextFunction } from 'express';
import { User } from '../../entities';

import { AUTH_LOGIN as route } from '../routes';
import { NotFound } from '../messages';
import {
    ErrorHandler,
    createToken,
    validateHash,
    deleteObjectInObjects
} from '../../utils';

// https://velog.io/@yaytomato/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%90%EC%84%9C-%EC%95%88%EC%A0%84%ED%95%98%EA%B2%8C-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%EC%B2%98%EB%A6%AC%ED%95%98%EA%B8%B0

export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isError = errorHandler(req, res, next);
    if (isError) return isError;

    try {
        return await tryLogin(req, res, next);
    } catch (error) {
        console.log(error);

        return next({
            status: 500,
            route
        });
    }
};

// 나중에 email, nickname 분리하기
const tryLogin = async (req, res, next) => {
    const { id, password } = req.body;
    const user = await User.findOne({
        where: [{ email: id }, { nickname: id }],
        select: [
            'email',
            'nickname',
            'hash',
            'salt',
            'profile',
            'socialType',
            'role',
            'refreshToken',
            'createdAt'
        ]
    });

    if (!user) {
        return next({
            status: 404,
            route,
            message: NotFound('user')
        });
    }

    const isSuccess = await checkUserPassword(user, password);
    if (isSuccess) {
        const refreshToken = user.refreshToken;
        const accessToken = createToken({ email: user.email });

        deleteObjectInObjects(user, ['hash', 'salt', 'refreshToken']);

        return res.json({ user, accessToken, refreshToken });
    } else {
        return next({
            status: 400,
            route,
            message: 'NotCorrect Password'
        });
    }
};

const checkUserPassword = async (user: User, password: string) => {
    const { hash }: any = await validateHash(password, user.salt);
    if (user.hash === hash) {
        return true;
    } else {
        return false;
    }
};

const errorHandler = (req: Request, res: Response, next: NextFunction) => {
    const { id, password } = req.body;

    const isRequired = ErrorHandler.isRequiredExist({ id, password });
    if (isRequired.length > 0) {
        return res.status(400).json({ route, message: { isRequired } });
    }

    return false;
};
