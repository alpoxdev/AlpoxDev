import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Series } from '../../models';

export const onGetSeries = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

        const series: Series | null = await Series.findByPk(id);
        if (!series) throw { status: 404, message: 'NotFound category' };

        return res({
            status: 200,
            body: { series },
        });
    }
);
