import { Request, Response, NextFunction } from 'express';
import { onGetApickPosts } from './apick';

import { GET_APICK_POSTS as route } from '../routes';
import { NotFound } from '../messages';

export const getApickPosts = async(req : Request, res : Response, next : NextFunction) => {
    try{
        return await tryGetApickPosts(req, res, next);
    }catch(error){
        next({
            status : 500,
            route
        })
    }
}

const tryGetApickPosts = async(req : Request, res : Response, next : NextFunction) => {
    const { 
        page = 0,
        take = 30
    } = req.query;
    
    const posts = await onGetApickPosts(page, take);
    if(posts){
        res.status(200).json({ posts });
    }else{
        next({
            status : 404,
            route,
            message : NotFound('posts')
        })
    }
}