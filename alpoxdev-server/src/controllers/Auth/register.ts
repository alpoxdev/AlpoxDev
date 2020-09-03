import { Request, Response, NextFunction } from 'express';
import { User } from '../../entities';

import { ErrorHandler, createHash } from '../../utils';
import { AUTH_REGISTER as route } from '../routes';

export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isError = await errorHandler(req, res, next);
    if (isError) return isError;

    try {
        return await tryRegister(req, res, next);
    } catch (error) {
        return next({
            status: 500,
            route
        });
    }
};

const tryRegister = async (req, res, next) => {
    const user = await createUser(req);

    if (user) {
        await User.save(user);
        return res.status(201).json({ user });
    } else {
        return next({
            status: 500,
            route
        });
    }
};

const createUser = async (req: Request) => {
    const { email, password, nickname, profile } = req.body;
    const { hash, salt }: any = await createHash(password);

    const user = new User();
    user.email = email;
    user.nickname = nickname;
    user.profile = profile;
    user.hash = hash;
    user.salt = salt;

    return user;
};

const errorHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, password } = req.body;

    const isRequired = ErrorHandler.isRequiredExist({ email, password });
    if (isRequired.length > 0) {
        return res.status(400).json({ route, message: { isRequired } });
    }

    const isUser = await isUserExist(req);
    if (isUser.length > 0) {
        return res.status(400).json({ route, message: { isUser } });
    }

    return false;
};

const isUserExist = async req => {
    const { email, nickname } = req.body;
    const isUser: string[] = [];

    const [userWithEmail, userWithNickname] = await Promise.all([
        User.findOne({ where: { email } }),
        User.findOne({ where: { nickname } })
    ]);

    if (userWithEmail) {
        isUser.push('email');
    }
    if (userWithNickname) {
        isUser.push('nickname');
    }

    return isUser;
};
