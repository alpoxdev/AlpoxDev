import { Response, Request, NextFunction } from 'express';
import { Post, Tag } from '../../entities';

import { GET_TAGS as route } from '../routes';
import { NotFound } from '../message';

export const getTags = async (req: Request, res: Response, next: NextFunction) => {
    try {
        return await tryGetTags(req, res, next);
    } catch (error) {
        console.log(error);
        return next({
            status: 500,
            route
        });
    }
};

// reference
// https://github.com/typeorm/typeorm/issues/1961#issuecomment-404008568

const tryGetTags = async (req, res, next) => {
    let tags = await Tag.createQueryBuilder("tag")
        .leftJoin("tag.posts", "posts")
        .select('tag.id', 'id')
        .addSelect('tag.tag', 'tag')
        .addSelect('COUNT(DISTINCT(posts.id)) as posts')
        .orderBy('posts', 'DESC')
        .groupBy('tag.id')
        .getRawMany();

    if (tags) {
        return res.status(200).json({ tags });
    } else {
        return next({
            status: 404,
            route,
            message: NotFound('tags')
        });
    }
};