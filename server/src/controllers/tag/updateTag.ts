import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Tag } from '../../models';
import { AdminAuthorizer } from '../../middlewares';

export const onUpdateTag = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        await AdminAuthorizer(req);

        const { id } = req.params;

        const tag: Tag | null = await Tag.findByPk(id);
        if (!tag) throw { status: 404, message: 'NotFound tag' };

        await tag.update({ name });

        return res({ status: 204 });
    }
);
