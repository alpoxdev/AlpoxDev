import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase, Post } from '../../models';
import { MYSQL } from '../../config';

export const getPosts = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { page, offset } = req.query;

        const { models } = await connectDatabase();
        const posts: Post[] = await models.Post.find({
            skip: page * offset,
            take: offset,
        });

        console.log(`MYSQL`, MYSQL);

        return res({
            status: 200,
            body: { posts },
        });
    }
);
