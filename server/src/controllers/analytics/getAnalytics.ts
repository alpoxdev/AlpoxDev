import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Post, Category, Tag, Series } from '../../models';

export const onGetAnalytics = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const [
            postCount,
            categoryCount,
            tagCount,
            seriesCount,
        ] = await Promise.all([
            Post.count(),
            Category.count(),
            Tag.count(),
            Series.count(),
        ]);

        return res({
            status: 200,
            body: {
                postCount,
                categoryCount,
                tagCount,
                seriesCount,
            },
        });
    }
);
