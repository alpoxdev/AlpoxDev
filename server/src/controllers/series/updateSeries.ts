import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Series } from '../../models';

export const onUpdateSeries = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;
        const { name } = req.body;

        const series: Series | null = await Series.findByPk(id);
        if (!series) throw { status: 404, message: 'NotFound series' };

        await series.update({ name });

        return res({ status: 204 });
    }
);
