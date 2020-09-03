import { Request, Response, NextFunction } from 'express';
import { ApickTag } from '../../entities';
import { onGetApickTagById } from './apick';

import { CREATE_APICK_TAG as route } from '../routes';
import { BadRequest } from '../messages';
import { ErrorHandler } from '../../utils';

export const createApickTag = async(req : Request, res : Response, next : NextFunction) => {
    const isError = errorHandler(req, res, next);
    if(isError) return isError;
    
    try{
        return await tryCreateApickTag(req, res, next);
    }catch(error){
        next({
            route
        })
    }
}

const tryCreateApickTag = async(req : Request, res: Response, next : NextFunction) => {
    const tag = req.body?.tag;
    
    const findTag = await onGetApickTagById(tag);
    if(!findTag){
        const newTag = await createAndSaveApickTag(tag);
        res.status(201).json({ tag : newTag });
    }else{
        next({
            status : 400,
            route,
            message : 'Already Exist Tag'
        })
    }
}

const createAndSaveApickTag = async(tag) => {
    const newTag = new ApickTag();
    newTag.tag = tag;
    
    await ApickTag.save(newTag);
    return newTag;
}

const errorHandler = (req : Request, res : Response, next : NextFunction) => {
    const tag = req.body?.tag;
    
    const isRequired = ErrorHandler.isRequiredExist({ tag });
    if(isRequired.length > 0){
        return next({
            status : 400,
            route,
            message : BadRequest({ isRequired })
        });
    }

    return false;
}