import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Post, Comment } from '../../models';
import { Authorizer } from '../../middlewares';

export const onCreateComment = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const user = await Authorizer(req);
        console.log(`onCreateComment`, user);

        const { id } = req.params;
        const { content } = req.body;

        const post: Post | null = await Post.findByPk(id);
        if (!post) throw { status: 404, message: 'NotFound post' };

        const comment = await Comment.create({
            content,
            userId: user.id,
            user,
            postId: post.id,
            post,
        });

        return res({
            status: 201,
            body: { post, comment },
        });
    }
);
