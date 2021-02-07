import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Category } from '../../models';

export const onGetCategories = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { limit, offset } = req.query;

        const { count, rows } = await Category.findAndCountAll({
            limit,
            offset,
        });

        return res({
            status: 200,
            body: { count, categories: rows },
        });
    }
);
