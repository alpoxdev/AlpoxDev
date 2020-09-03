import * as CryptoJS from 'crypto-js';
import * as bkfd2Password from 'pbkdf2-password';

import { secret } from '../config/jwt.config.json';

const hasher = bkfd2Password();

export const createSocialHash = (socialId: string) => {
    const hashDigest = CryptoJS.SHA256(secret + socialId);
    return hashDigest.toString();
};

export const createHash = async (password: string) => {
    return await createPromiseHash(password);
};

const createPromiseHash = (password: string) =>
    new Promise((resolve, reject) => {
        hasher({ password }, function(
            err: any,
            pass: any,
            salt: string,
            hash: string
        ) {
            if (err) {
                reject(err);
            }
            const result = { hash, salt };
            resolve(result);
        });
    });

export const validateHash = async (password: string, salt: string) => {
    return await validatePromiseHash(password, salt);
};

const validatePromiseHash = (password: string, salt: string) =>
    new Promise((resolve, reject) => {
        hasher({ password, salt }, function(err, pass, salt, hash) {
            if (err) {
                reject(err);
            }
            const result = { hash };
            resolve(result);
        });
    });
