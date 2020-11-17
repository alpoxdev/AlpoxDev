import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS: number = 12;

export const createPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(password, salt);

    return { salt, hash };
};

export const comparePassword = async (password: string, hash: string) => {
    const compared = await bcrypt.compare(password, hash);
    return compared;
};
