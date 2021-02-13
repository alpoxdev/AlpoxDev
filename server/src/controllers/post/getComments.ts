import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Comment, Post, User } from '../../models';

export const onGetComments = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

		const comments = await Comment.findAll({
			where: { postId: id },
			include: User,
		});

        return res({
            status: 200,
            body: { comments },
        });
    }
);
