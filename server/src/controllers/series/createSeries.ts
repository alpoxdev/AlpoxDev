import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Series } from '../../models';
import { AdminAuthorizer } from '../../middlewares';

export const onCreateSeries = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const user = await AdminAuthorizer(req);

        const { name } = req.body;
        const series = await Series.create({
            name,
            user,
        });

        return res({
            status: 201,
            body: { series },
        });
    }
);
