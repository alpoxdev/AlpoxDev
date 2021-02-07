import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Category } from '../../models';
import { AdminAuthorizer } from '../../middlewares';

export const onUpdateCategory = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        await AdminAuthorizer(req);
        const { id } = req.params;
        const { name } = req.body;

        const category: Category | null = await Category.findByPk(id);
        if (!category) throw { status: 404, message: 'NotFound category' };

        await category.update({ name });

        return res({ status: 204 });
    }
);
