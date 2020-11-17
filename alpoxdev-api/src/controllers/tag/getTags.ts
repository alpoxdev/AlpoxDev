import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase } from '../../models';

export const getTags = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { page, offset } = req.query;
        const { models } = await connectDatabase();

        const tags = await models.Tag.createQueryBuilder('tag')
            .leftJoin('tag.posts', 'posts')
            .select('tag.id', 'id')
            .addSelect('tag.tag', 'tag')
            .addSelect('COUNT(DISTINCT(posts.id)) as posts')
            .orderBy('posts', 'DESC')
            .groupBy('tag.id')
            .offset(page * offset)
            .limit(offset)
            .getRawMany();

        return res({ status: 200, body: { tags } });
    }
);
