import { User } from '../../entities';

export const findUsers = async (findOptions: any = null) => {
    const users = await User.find(findOptions);
    return users || null;
};

export const findUser = async (findOptions: any = null) => {
    const user = await User.findOne(findOptions);
    return user ? user : null;
};
