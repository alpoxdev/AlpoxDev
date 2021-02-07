import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { User, Category, Tag, Post, Comment, Series } from '../../models';

export const onGetPost = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

        const post = await Post.findOne({
            where: { id },
            include: [User, Category, Series, Tag, Comment],
        });
        if (!post) throw { status: 404, message: 'NotFound post' };

        return res({
            status: 200,
            body: { post },
        });
    }
);
