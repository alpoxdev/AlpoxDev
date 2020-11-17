import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase, Post, Tag } from '../../models';

export const getTag = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { models } = await connectDatabase();

        const tag = await models.Tag.findOne({
            where: { id },
            relations: ['posts'],
        });

        if (!tag) throw { status: 404, message: 'NotFound tag' };

        return res({ status: 200, body: { tag } });
    }
);
