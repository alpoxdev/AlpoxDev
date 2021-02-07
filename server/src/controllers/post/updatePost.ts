import { Op } from 'sequelize';

import {
    createGatewayProxyHandler,
    Request,
    Response,
    ResponseType,
} from '../../services';
import { Category, Post, Series, Tag } from '../../models';
import { SelfAuthorizer } from '../../middlewares';

export const onUpdatePost = createGatewayProxyHandler(
    async (req: Request, res: Response): Promise<ResponseType> => {
        const { id } = req.params;
        const {
            title,
            subtitle,
            content,
            tags = [],
            categoryId = null,
            seriesId = null,
        } = req.body;

        const post = await Post.findOne(id);
        if (!post) throw { status: 404, message: 'NotFound post' };

        await SelfAuthorizer(req, post.user);

        await post.update({
            title: title || post.title,
            subtitle: subtitle || post.subtitle,
            content: content || post.content,
            category: categoryId
                ? await Category.findByPk(categoryId)
                : post.category,
            series: seriesId ? await Series.findByPk(seriesId) : post.series,
            tags:
                tags.length > 0
                    ? await Tag.findAll({
                          where: {
                              [Op.or]: tags.map((id: number) => ({ id })),
                          },
                      })
                    : post.tags,
        });

        return res({ status: 204 });
    }
);
