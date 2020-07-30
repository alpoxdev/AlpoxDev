import { Request, Response, NextFunction } from 'express';
import { Post } from '../../entities';

import { ErrorHandler } from '../../utils';
import { GET_POSTS as route } from '../routes';
import { NotFound } from '../message';

export const getPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { tag } = req.query;

    try {
        if (tag) {
            return await tryGetPostsByTag(req, res, next);
        } else {
            return await tryGetPosts(req, res, next);
        }
    } catch (error) {
        console.log(error);

        return next({
            status: 500,
            route
        });
    }
};

const tryGetPosts = async (req, res, next) => {
    const { page = 0, offset = 100 } = req.query;

    const posts = await Post.find({
        order: {
            createdAt: 'DESC'
        },
        skip: page,
        take: offset
    });

    if (posts) {
        return res.status(200).json({ posts });
    } else {
        return next({
            status: 404,
            route,
            message: NotFound('posts')
        });
    }
};

const tryGetPostsByTag = async (req, res, next) => {
    const { page = 0, offset = 10, tag } = req.query;

    const posts = await Post.createQueryBuilder('post')
        .leftJoinAndSelect('post.tags', 'tags')
        .leftJoinAndSelect('post.user', 'user')
        .where('tags.id = :id', { id: tag })
        .orderBy('post.createdAt', 'DESC')
        .limit(offset)
        .offset(page)
        .cache(true)
        .getMany();

    if (posts) {
        return res.status(200).json({ posts });
    } else {
        return next({
            status: 404,
            route,
            message: NotFound('posts')
        });
    }
};

export default getPosts;
