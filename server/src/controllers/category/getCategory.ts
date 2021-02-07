import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Category } from '../../models';

export const onGetCategory = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

        const category: Category | null = await Category.findByPk(id);
        if (!category) throw { status: 404, message: 'NotFound category' };

        return res({
            status: 200,
            body: { category },
        });
    }
);
