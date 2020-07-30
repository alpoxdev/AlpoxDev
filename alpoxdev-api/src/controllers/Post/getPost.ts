import { Request, Response, NextFunction } from 'express';
import { Post } from '../../entities';

import { ErrorHandler } from '../../utils';
import { GET_POST as route } from '../routes';
import { NotFound } from '../message';

export const getPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        return await tryGetPost(req, res, next);
    } catch (error) {
        return next({
            status: 500,
            route: 'GET /posts/:id'
        });
    }
};

const tryGetPost = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const post = await Post.findOne(id);

    if (post) {
        return res.status(200).json({ post });
    } else {
        return next({
            status: 404,
            route,
            message: NotFound('post')
        });
    }
};

export default getPost;
