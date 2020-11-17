import { Request, verifyToken } from '../services';
import { connectDatabase } from '../models';
import { User } from '../models/models';

const BEARER_TOKEN_PATTERN = /^Bearer[ ]+([^ ]+)[ ]*$/i;

const extractAccessToken = (authorization: string | null | undefined) => {
    if (!authorization) return null;

    const result = BEARER_TOKEN_PATTERN.exec(authorization);
    if (!result) return null;

    return result[1];
};

export const Authorizer = async (req: Request) => {
    const authorizationHeader: any = req.headers['Authorization'];
    const accessToken: string | null = extractAccessToken(authorizationHeader);

    if (!accessToken) throw { status: 401, message: 'Invalid Bearer Token' };

    const verified = verifyToken(accessToken);

    const { models } = await connectDatabase();
    const user = await models.User.findOne({ where: { id: verified?.id } });

    if (user) {
        return user;
    } else {
        throw { status: 401, message: 'NotFound User' };
    }
};

export const AdminAuthorizer = async (req: Request) => {
    const user = await Authorizer(req);
    const isAdmin = user?.role === 'admin';

    if (isAdmin) {
        return user;
    } else {
        throw {
            status: 401,
            message: 'Authorization Failure: No Admin Permission',
        };
    }
};

export const SelfAuthorizer = async (req: Request, compareUser: User) => {
    const user = await Authorizer(req);

    if (user?.id === compareUser?.id || user?.role === 'admin') {
        return user;
    } else {
        throw { status: 401, message: 'Authorization Failure: No Permission' };
    }
};
