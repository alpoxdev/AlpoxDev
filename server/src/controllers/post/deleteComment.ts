import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Comment } from '../../models';
import { SelfAuthorizer } from '../../middlewares';

export const onDeleteComment = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

        const commment = await Comment.findByPk(id);
        if (!commment) throw { status: 404, message: 'NotFound comment' };

        await SelfAuthorizer(req, commment.user);
        await commment.destroy();

        return res({ status: 204 });
    }
);
