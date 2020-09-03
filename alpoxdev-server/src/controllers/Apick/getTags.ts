import { Request, Response, NextFunction } from 'express';
import { onGetApickTags } from './apick';

import { GET_APICK_TAGS as route } from '../routes';
import { NotFound } from '../messages';

export const getApickTags = async(req : Request, res: Response, next : NextFunction) => {
    try{
        return await tryGetApickTags(req, res, next);
    }catch(error){
        next({
            route
        })
    }
}

const tryGetApickTags = async(req : Request, res : Response, next : NextFunction) => {
    const tags = await onGetApickTags();
    if(tags){
        res.status(200).json({ tags });
    }else{
        next({
            status : 404,
            route,
            message : NotFound('tags')
        })
    }
}