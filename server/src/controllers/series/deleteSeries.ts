import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Series } from '../../models';

export const onDeleteSeries = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;

        const series = await Series.findByPk(id);
        if (!series) throw { status: 401, message: 'NotFound series' };

        await series.destroy();

        return res({ status: 204 });
    }
);
