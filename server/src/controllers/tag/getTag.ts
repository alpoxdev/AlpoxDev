import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Tag } from '../../models';

export const onGetTag = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

        const tag: Tag | null = await Tag.findByPk(id);
        if (!tag) throw { status: 404, message: 'NotFound tag' };

        return res({
            status: 200,
            body: { tag },
        });
    }
);
