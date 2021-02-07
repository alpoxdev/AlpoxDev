import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Comment, Post } from '../../models';

export const onGetComments = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

        const post = await Post.findOne({
            where: { id },
            include: Comment,
        });
        if (!post) throw { status: 404, message: 'NotFound post' };

        return res({
            status: 200,
            body: { commments: post.comments },
        });
    }
);
