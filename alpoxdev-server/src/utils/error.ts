import { Request, Response } from 'express';

export default class ErrorHandler {
    // 400 Error Handling : 1
    static isRequiredExist(object: any) {
        let isRequired = [];
        for (let [key, value] of Object.entries(object)) {
            if (!value) isRequired.push(key);
        }

        return isRequired;
    }

    // 400 Error Handling : 2
    static isLeastOneExist(object: any) {
        let isRequired = [];
        for (let [key, value] of Object.entries(object)) {
            if (!value) isRequired.push(key);
        }

        if (isRequired.length === Object.keys(object).length) {
            return false;
        }

        return true;
    }

    // 401 Error Handling
    static isUserExist(object: any) {
        for (let [key, value] of Object.entries(object)) {
            if (value && key === 'user') {
                return true;
            }
        }

        return false;
    }

    // 401 Error Handling
    static isPdfUserExist(object: any) {
        for (let [key, value] of Object.entries(object)) {
            if (value && key === 'pdfUser') {
                return true;
            }
        }

        return false;
    }

    // 404
    static isObjectExist(object: any) {
        return object ? object : false;
    }

    // 500
    static isInternalError(res: Response, apiName: string) {
        return res
            .status(500)
            .json({ message: apiName + ' : Server Internal Error' });
    }
}
