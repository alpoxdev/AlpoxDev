import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Tag } from '../../models';
import { AdminAuthorizer } from '../../middlewares';

export const onCreateTag = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        await AdminAuthorizer(req);

        const { name } = req.params;

        const findTag = await Tag.findOne({
            where: { name },
        });
        if (findTag) throw { status: 400, message: 'Already exist tag' };

        const tag = await Tag.create({ name });

        return res({
            status: 201,
            body: { tag },
        });
    }
);
