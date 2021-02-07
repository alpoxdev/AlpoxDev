import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Category } from '../../models';
import { AdminAuthorizer } from '../../middlewares';

export const onCreateCategory = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const user = await AdminAuthorizer(req);

        const { name } = req.body;
        const findCategory = await Category.findOne({
            where: { name },
        });
        if (findCategory)
            throw { status: 400, message: 'Already exist category' };

        const category = await Category.create({
            name,
            user,
        });

        return res({
            status: 201,
            body: { category },
        });
    }
);
