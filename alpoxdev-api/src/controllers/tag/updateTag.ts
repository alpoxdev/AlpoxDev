import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase } from '../../models';
import { AdminAuthorizer } from '../../middlewares';

export const updateTag = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { tag, description } = req.body;

        const { models } = await connectDatabase();
        await AdminAuthorizer(req);

        const findTag = await models.Tag.findOne(id);
        if (!findTag) throw { status: 404, message: 'NotFound tag' };

        findTag.tag = tag || findTag.tag;
        findTag.description = description || findTag.description;
        await models.Tag.save(findTag);

        return res({ status: 204 });
    }
);
