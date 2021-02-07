import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase, Post, Tag } from '../../models';
import { MemberAuthorizer } from '../../middlewares';

export const createPost = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { title, content, thumbnail, tags } = req.body;

        const { models } = await connectDatabase();
        const user = await MemberAuthorizer(req);

        const post = new Post();
        post.title = title;
        post.content = content;
        post.thumbnail = thumbnail;
        post.user = user;
        post.tags = await tryFindOrCreateTags(tags);

        await models.Post.save(post);

        return res({ status: 201, body: { post } });
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
