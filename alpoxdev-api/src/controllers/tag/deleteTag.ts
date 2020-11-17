import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase } from '../../models';
import { AdminAuthorizer } from '../../middlewares';

export const deleteTag = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;
        const { models } = await connectDatabase();
        await AdminAuthorizer(req);

        const findTag = await models.Tag.findOne(id);
        if (!findTag) throw { status: 404, message: 'NotFound tag' };

        await models.Tag.remove(findTag);

        return res({ status: 204 });
    }
);
