import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase } from '../../models';
import { AdminAuthorizer } from '../../middlewares';

export const deletePost = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const { models } = await connectDatabase();
        await AdminAuthorizer(req);

        const findPost = await models.Post.findOne(id);
        if (!findPost) throw { status: 404 };

        await models.Post.softRemove(findPost);

        return res({ status: 204 });
    }
);
