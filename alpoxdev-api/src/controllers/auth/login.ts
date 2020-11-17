import {
    createGatewayProxyHandler,
    Request,
    Response,
    comparePassword,
} from '../../services';
import { connectDatabase } from '../../models';

export const login = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { models } = await connectDatabase();

        const { id, password } = req.body;
        const user = await models.User.findOne({
            where: [{ email: id }, { nickname: id }],
        });

        if (!user) throw { status: 404, message: 'NotFound user' };

        const isCorrect = await comparePassword(password, user?.hash);
        if (!isCorrect) throw { status: 400, message: 'NotCorrect Password' };

        return res({
            status: 200,
            body: {
                user,
                accessToken: user.accessToken,
            },
        });
    }
);
