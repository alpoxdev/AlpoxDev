import {
    createGatewayProxyHandler,
    Request,
    Response,
    createPassword,
} from '../../services';
import { connectDatabase } from '../../models';

export const register = createGatewayProxyHandler(
    async (req: Request, res: Response) => {
        const { models } = await connectDatabase();

        const { email, password, nickname } = req.body;
        const { hash, salt } = await createPassword(password);

        await models.User.create({
            email,
            nickname,
            hash,
            salt,
        }).save();

        return res({ status: 201 });
    }
);
