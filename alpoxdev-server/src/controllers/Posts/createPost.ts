import { Request, Response, NextFunction } from 'express';
import { User, Post, Tag } from '../../entities';

import { ErrorHandler } from '../../utils';
import { CREATE_POST as route } from '../routes';
import { BadRequest, NoAuthorization } from '../messages';

/*
    [type]
    {
        "title" : string,
        "content" : string,
        "thumbnail" : string,
        "tags" : [
            'tag1',
            'tag2
        ]
    }
*/

export interface ICreatePostInstance {
    user: User;
    title: string;
    thumbnail?: string;
    content: string;
}

export const createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isError = await errorHandler(req, res, next);
    console.log(isError);

    if (isError) return isError;

    try {
        return await tryCreatePost(req, res, next);
    } catch (error) {
        console.log(error);

        return next({
            status: 500,
            route
        });
    }
};

const tryCreatePost = async (req, res, next) => {
    const { user } = req;
    const { title, content, thumbnail, tags } = req.body;

    const post = createPostInstance({ user, title, content, thumbnail });
    await Post.save(post);

    tags && (await tryCreateOrFindTagList(post, tags));

    if (post) {
        return res.status(201).json({ post });
    } else {
        return next({
            status: 500,
            route
        });
    }
};

const createPostInstance = ({
    user,
    title,
    content,
    thumbnail
}: ICreatePostInstance) => {
    const post = new Post();
    post.user = user;
    post.title = title;
    post.content = content;
    post.thumbnail = thumbnail;

    return post;
};

const tryCreateOrFindTagList = async (post: Post, tags: Array<string>) => {
    if (!tags || tags.length === 0) return;

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

const errorHandler = async(req: Request, res: Response, next: NextFunction) => {
    const { user } = req;
    const { title, content, tags } = req.body;

    const isUser = ErrorHandler.isUserExist({ user });
    if (!isUser) {
        return next({
            status: 401,
            route,
            message: NoAuthorization()
        });
    }

    const isRequired = ErrorHandler.isRequiredExist({ title, content, tags });
    if (isRequired.length > 0) {
        return next({
            status: 400,
            route,
            message: BadRequest({ isRequired })
        });
    }

    const isTagArray = Array.isArray(tags);
    if (tags && !isTagArray) {
        return next({
            status: 400,
            route,
            message: BadRequest('tags should be array!')
        });
    }

    return false;
};
