import { Request, Response, NextFunction } from 'express';
import { onGetApickPost } from './apick';

import { GET_APICK_POST as route } from '../routes';
import { NotFound } from '../messages';

export const getApickPost = async(req : Request, res : Response, next : NextFunction) => {
    try{
        return await tryGetApickPost(req, res, next);
    }catch(error){
        next({
            status : 500,
            route
        })
    }
}

const tryGetApickPost = async(req : Request, res : Response, next : NextFunction) => {
    const { id } = req.params;
    const post = await onGetApickPost(id);
    
    if(post){
        res.status(200).json({ post });
    }else{
        next({
            status : 404,
            route,
            message : NotFound('post')
        })
    }
}