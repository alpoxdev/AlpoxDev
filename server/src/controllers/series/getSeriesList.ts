import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Series } from '../../models';

export const onGetSeriesList = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { limit, offset } = req.query;

        const { count, rows } = await Series.findAndCountAll({
            limit,
            offset,
        });

        return res({
            status: 200,
            body: { count, seriesList: rows },
        });
    }
);
