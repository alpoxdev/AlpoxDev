import { createGatewayProxyHandler, Request, Response } from '../../services';
import { connectDatabase } from '../../models';
import { SelfMemberAuthorizer } from '../../middlewares';

export const deletePost = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { id } = req.params;

        const { models } = await connectDatabase();

        const findPost = await models.Post.findOne(id);
        if (!findPost) throw { status: 404 };

        await SelfMemberAuthorizer(req, findPost?.user);
        await models.Post.softRemove(findPost);

        return res({ status: 204 });
    }
);
