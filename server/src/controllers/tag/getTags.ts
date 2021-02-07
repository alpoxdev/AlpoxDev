import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Tag } from '../../models';

export const onGetTags = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const tags = await Tag.findAndCountAll();
        const { count, rows } = tags;

        return res({
            status: 200,
            body: { count, tags: rows },
        });
    }
);
