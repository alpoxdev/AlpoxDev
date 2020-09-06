import { Request, Response, NextFunction } from 'express';
import { Tag } from '../../entities';

import { GET_TAG as route } from '../routes';

export const getTag = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return await tryGetTag(req, res, next);
    } catch (error) {
        next({
            status: 500,
            route
        });
    }
};

const tryGetTag = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const tag = await Tag.findOne({
        where: { id },
        relations: ['posts']
    });

    res.status(200).json(tag);
};
