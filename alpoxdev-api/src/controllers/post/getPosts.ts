import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase, Post } from '../../models';
import { MYSQL } from '../../config';

export const getPosts = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { page, offset, email = 'alpoxdev@gmail.com' } = req.query;

        const { models } = await connectDatabase();

        const query = models.Post.createQueryBuilder('post')
            .select([
                'post.id',
                'post.title',
                'post.thumbnail',
                'post.content',
                'post.createdAt',
            ])
            .where('user.email = :email', { email })
            .leftJoinAndSelect('post.user', 'user')
            .orderBy('post.createdAt', 'DESC')
            .cache(5000);

        const posts: Post[] = await query
            .skip(page * offset)
            .take(offset)
            .getMany();
        const count = await query.getCount();

        return res({
            status: 200,
            body: {
                posts,
                count,
            },
        });
    }
);
