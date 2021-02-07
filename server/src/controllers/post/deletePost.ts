import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Post } from '../../models';
import { SelfAuthorizer } from '../../middlewares';

export const onDeletePost = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

        const post = await Post.findOne(id);
        if (!post) throw { status: 404, message: 'NotFound post' };

        await SelfAuthorizer(req, post.user);
        await post.destroy();

        return res({ status: 204 });
    }
);
