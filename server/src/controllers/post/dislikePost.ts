import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Post } from '../../models';

export const onDislikePost = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

        const post = await Post.findByPk(id);
        if (!post) throw { status: 404, message: 'NotFound post' };

        return res({ status: 204 });
    }
);
