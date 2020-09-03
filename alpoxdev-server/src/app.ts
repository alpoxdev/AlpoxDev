require('dotenv').config();

import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import * as serverless from 'serverless-http';

import { createConnection, getConnection } from 'typeorm';
import * as cors from 'cors';

import routers from './routes';
import winstonLogger from './utils/logger';

const PORT: string | number = process.env.PORT || 80;
const isDev: boolean = process.env.NODE_ENV === 'dev';

export let app: express.Application | null = null;
let handler: any = null;
let connection: any = null;

// serverless --logs
let requestCount: number = 0;
let databaseConnectionCount: number = 0;

export interface ErrorProps {
    status?: number;
    route?: string;
    message?: any;
}

export default class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
    }

    private config() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        this.app.use(express.static('node_modules'));
        this.app.use(cors());
        this.app.use(winstonLogger);
        this.app.use((req, res, next) => {
            console.log(`Request Count : ${++requestCount}`);
            next();
        });

        // router
        this.routerConfig();
    }

    private routerConfig() {
        this.app.use(routers);

        this.app.use(
            (
                err: ErrorProps,
                req: Request,
                res: Response,
                next: NextFunction
            ) => {
                const {
                    status = 500,
                    route = '',
                    message = 'Server Internal Error'
                } = err;

                res.status(status || 500).json({ route, message });
            }
        );

        this.app.use('/', (req: Request, res: Response) => {
            res.status(404).send('ALPOXDEV API');
        });

        isDev &&
            this.app.listen(PORT, () => {
                console.log('Listening on localhost : ' + PORT);
            });
    }

    public static async connectDatabase() {
        if (connection && connection.isConnected) return;

        connection = await createConnection();
        console.log(
            `New Database Connection...! : ${++databaseConnectionCount}`
        );
    }

    public static async disconnectDatabase() {
        if (!connection) return;

        const isConnected = connection && connection.isConnected;
        if (!isConnected) return;

        await getConnection().close();
        console.warn(`Disconnect Database Connection...!`);
    }
}

if (isDev) {
    if (!app) app = new App().app;
    App.connectDatabase();
}

module.exports.handler = async (event, context) => {
    if (!app) app = new App().app;
    if (!handler) handler = serverless(app);

    await App.connectDatabase();
    return await handler(event, context);
};
