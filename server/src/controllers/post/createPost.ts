import { Op } from 'sequelize';

import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Category, Post, Series, Tag } from '../../models';
import { Authorizer } from '../../middlewares';

export const onCreatePost = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const user = await Authorizer(req);

        const {
            title,
            subtitle,
            content,
            tags = [],
            categoryId = null,
            seriesId = null,
        } = req.body;

        const post = await Post.create({
            title,
            subtitle,
            content,
            user,
            category: categoryId ?? (await Category.findByPk(categoryId)),
            series: seriesId ?? (await Series.findByPk(seriesId)),
            tags: tags
                ? await Tag.findAll({
                      where: { [Op.or]: tags.map((id: number) => ({ id })) },
                  })
                : [],
        });

        return res({
            status: 201,
            body: { post },
        });
    }
);
