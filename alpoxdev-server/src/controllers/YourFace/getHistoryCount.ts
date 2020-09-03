import { Request, Response, NextFunction } from 'express';

import { YourFaceHistory } from '../../entities';
import { GET_YOURFACE_COUNT as route } from '../routes';

export const getHistoryCount = async(req : Request, res: Response, next : NextFunction) => {
    try{
        return await tryGetHistoryResult(req, res, next);
    }catch(error){
        next({
            status : 500,
            route
        })
    }
}

const tryGetHistoryResult = async(req : Request, res : Response, next : NextFunction) => {
    const count = await YourFaceHistory.count();
    return res.status(200).json({ count });
}