import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase } from '../../models';

export const getTags = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { page, offset } = req.query;
        const { models } = await connectDatabase();

        const query = models.Tag.createQueryBuilder('tag')
            .leftJoin('tag.posts', 'posts')
            .select('tag.id', 'id')
            .addSelect('tag.tag', 'tag')
            .addSelect('COUNT(DISTINCT(posts.id)) as posts')
            .orderBy('posts', 'DESC')
            .groupBy('tag.id');
        const tags = await query
            .skip(page * offset)
            .take(offset)
            .getRawMany();
        const count = await query.getCount();

        return res({ status: 200, body: { tags, count } });
    }
);
