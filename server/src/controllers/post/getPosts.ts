import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Post, Category, Tag, User, Comment, Series } from '../../models';

export const onGetPosts = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { limit, offset } = req.query;

        const { count, rows } = await Post.findAndCountAll({
            limit,
            offset,
            include: [User, Category, Series, Tag],
        });

        return res({
            status: 200,
            body: { count, posts: rows },
        });
    }
);
