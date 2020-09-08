import { Request, Response, NextFunction } from 'express';
import { Post } from '../../entities';

import { REMOVE_POST as route } from '../routes';
import { NotFound } from '../messages';

export const removePost = async (req, res, next) => {
    try {
        await tryRemovePost(req, res, next);
    } catch (error) {
        next({
            route
        });
    }
};

const tryRemovePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { user } = req;
    const { id } = req.params;

    const post = await Post.findOne(id);
    if (post && (post?.user?.id === user?.id || user?.role === 'admin')) {
        await Post.remove(post);
        return res.status(204).json();
    } else {
        next({
            status: 404,
            route,
            message: NotFound('post')
        });
    }
};
