import { Request, Response, NextFunction } from 'express';
import { Post, Tag } from '../../entities';

import { UPDATE_POST as route } from '../routes';
import { NoPermission } from '../messages';

export const updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await errorHandler(req, res, next);

    try {
        await tryUpdatePost(req, res, next);
    } catch (error) {
        next({
            status: 500,
            route
        });
    }
};

const tryUpdatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { user } = req;
    const { id } = req.params;
    const { title, thumbnail, content, tags } = req.body;

    const post = await Post.findOne(id);
    if (user.role === 'admin' || post?.user?.id === user.id) {
        post.title = title ? title : post.title;
        post.thumbnail = thumbnail ? thumbnail : post.thumbnail;
        post.content = content ? content : post.content;
        await Post.save(post);
        await tryCreateOrFindTagList(post, tags);

        res.status(204).json();
    } else {
        next({
            status: 500,
            route: NoPermission()
        });
    }
};

const tryCreateOrFindTagList = async (post: Post, tags: Array<string>) => {
    if (!tags) return;
    if (tags.length === 0) {
        post.tags = [];
        return await Post.save(post);
    }

    return await Promise.all(
        tags.map(async (tag: string) => {
            const findTag = await Tag.findOne({
                where: { tag },
                relations: ['posts']
            });

            if (findTag) {
                findTag.posts =
                    findTag.posts && findTag.posts.length !== 0
                        ? [...findTag.posts, post]
                        : [post];

                await Tag.save(findTag);
                return findTag;
            } else {
                const newTag = new Tag();
                newTag.tag = tag;
                newTag.posts = [post];
                newTag.description = null;

                await Tag.save(newTag);
                return newTag;
            }
        })
    );
};

const errorHandler = async (req, res, next) => {
    let isLeastOne = [];
    const { title, thumbnail, content, tags } = req.body;
    for await (const [key, value] of Object.entries(req.body)) {
        await console.log(key, value);

        if (!value) await isLeastOne.push(key);
    }

    if (isLeastOne.length === Object.keys(req.body).length) {
        next({
            status: 400,
            route,
            message: `At least one is needed`
        });
    }
};
