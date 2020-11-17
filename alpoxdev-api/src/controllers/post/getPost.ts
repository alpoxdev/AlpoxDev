import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase, Post } from '../../models';

export const getPost = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const { models } = await connectDatabase();
        const post: Post = await models.Post.findOne(id);
        if (!post) throw { status: 404, message: 'NotFound post' };

        return res({
            status: 200,
            body: { post },
        });
    }
);
