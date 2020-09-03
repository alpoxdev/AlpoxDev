import { Request, Response, NextFunction } from 'express';
import { User, SocialType } from '../../entities';

import { AUTH_SOCIAL as route } from '../routes';
import {
    ErrorHandler,
    createToken,
    createSocialHash,
    deleteObjectInObjects,
    createUUID
} from '../../utils';

export const social = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isError = errorHandler(req, res, next);
    if (isError) return isError;

    try {
        return await checkSocialAccount(req, res, next);
    } catch (error) {
        console.log(error);
        return next({
            status: 500,
            route
        });
    }
};

const checkSocialAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { socialId, socialType } = req.body;
    const socialIdHashed = createSocialHash(socialId);

    const user = await User.findOne({
        where: {
            socialId: socialIdHashed,
            socialType
        }
    });

    if (user) {
        const accessToken = createToken({ social: user.socialId });
        const refreshToken = user.refreshToken;
        return res.json({ user, accessToken, refreshToken });
    } else {
        return await trySocialRegister(req, res, next);
    }
};

const trySocialRegister = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { email, nickname, profile, socialType, socialId } = req.body;

    const isNickname = await checkNickname(nickname);
    if (isNickname) {
        return next({
            status: 400,
            route: 'POST /auth/social',
            message: 'BadRequest : Nickname is Duplicate'
        });
    }

    // 회원가입
    const user = new User();
    user.email = email || null;
    user.nickname = nickname;
    user.profile = profile;
    user.socialType =
        socialType === 'kakao' ? SocialType.KAKAO : SocialType.GOOGLE;
    user.socialId = createSocialHash(socialId);
    user.hash = null;
    user.salt = null;
    user.refreshToken = createUUID();

    await User.save(user);

    const accessToken = createToken({ social: user.socialId });
    const refreshToken = user.refreshToken;

    deleteObjectInObjects(user, ['socialId', 'hash', 'salt', 'refreshToken']);
    return res.status(201).json({ user, accessToken, refreshToken });
};

const checkNickname = async (nickname: string) => {
    const user = await User.findOne({
        where: { nickname }
    });

    if (user) return true;
    return false;
};

const errorHandler = (req: Request, res: Response, next: NextFunction) => {
    const { socialType, socialId } = req.body;

    const isRequired = ErrorHandler.isRequiredExist({ socialId, socialType });
    if (isRequired.length > 0) {
        return next({
            status: 400,
            route: 'POST /auth/social',
            message: { isRequired }
        });
    }

    if (socialType !== 'kakao' && socialType !== 'google') {
        return next({
            status: 400,
            route: 'POST /auth/social',
            message: 'Incorrect SocialType'
        });
    }

    return false;
};
