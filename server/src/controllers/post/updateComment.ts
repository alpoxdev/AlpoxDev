import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Comment } from '../../models';
import { SelfAuthorizer } from '../../middlewares';

export const onUpdateComment = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;
        const { content } = req.body;

        const comment = await Comment.findByPk(id);
        if (!comment) throw { status: 404, message: 'NotFound comment' };

        await SelfAuthorizer(req, comment.user);
        await comment.update({ content });

        return res({ status: 204 });
    }
);
