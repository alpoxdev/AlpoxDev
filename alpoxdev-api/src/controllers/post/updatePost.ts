import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase, Tag } from '../../models';
import { SelfMemberAuthorizer } from '../../middlewares';

export const updatePost = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { title, content, thumbnail, tags } = req.body;

        const { models } = await connectDatabase();

        const findPost = await models.Post.findOne(id);
        if (!findPost) throw { status: 404, message: 'NotFound post' };

        await SelfMemberAuthorizer(req, findPost?.user);

        findPost.title = title || findPost.title;
        findPost.content = content || findPost.content;
        findPost.thumbnail = thumbnail || findPost.thumbnail;
        findPost.tags = tags ? await tryFindOrCreateTags(tags) : findPost.tags;

        await models.Post.save(findPost);

        return res({ status: 204 });
    }
);

const tryFindOrCreateTags = async (tags: Array<number | string>) => {
    if (!tags) return [];

    const findOrCreateTags = [];
    for await (const tag of tags) {
        const findOrCreateTag = await tryFindOrCreateTag(tag);
        findOrCreateTags.push(findOrCreateTag);
    }

    return findOrCreateTags.filter((tag) => tag !== null);
};

const tryFindOrCreateTag = async (tag: number | string) => {
    if (typeof tag === 'number') {
        const findTag = await Tag.findOne(tag);
        if (!findTag) throw { status: 404, message: 'NotFound tag' };

        return findTag;
    }

    if (typeof tag === 'string') {
        const findTag = await Tag.findOne({ where: { tag } });
        if (findTag) return findTag;

        const newTag = await Tag.create({ tag }).save();
        return newTag;
    }

    return null;
};
