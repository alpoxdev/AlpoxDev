import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
import { createConnection, getConnection } from 'typeorm';
import * as cors from 'cors';

// Router
import router from './src/routes';

const app = express();
const isDev = process.env.NODE_ENV === 'dev';
const APP_NAME = "Alpoxdev API";
const PORT: any = process.env.PORT || 80;

export let connection: any = null;

export interface ErrorProps{
	status? : number;
	route? : string;
	message? : any;
}

const serverSetting = () => {
	app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static('public'));
	app.use(express.static('node_modules'));
	app.use(cors());
	app.use(router);
}

const serverDefaultRouter = () => {
	app.use((err: ErrorProps, req : Request, res : Response, next : NextFunction) => {
		const { 
			status = 500, 
			route = '', 
			message = 'Server Internal Error'
		} = err;
		
		return res.status(status || 500).json({ route, message });
 	});
	
	app.use('/', (req : Request, res : Response)=>{
		res.status(404).send(APP_NAME);
	});
	
	isDev && app.listen(PORT, (error:any )=>{
		if(error) throw error;
		console.log('Listening on localhost : '+ PORT);	
	});
}

export const databaseConnect = async() => {
	const isConnected = getDatabaseConnection();
	if(isConnected) return;
	
	connection = await createConnection();
}

export const databaseDisconnect = async() => {
	const isConnected = getDatabaseConnection();
	if(!isConnected) return;
	
	await getConnection().close();
}

export const getDatabaseConnection = () => {
	const isConnected = (connection && connection.isConnected);
	return isConnected;
}
 
export const serverInit = async() => {
	if(connection && connection.isConnected) return;
	
	await databaseConnect();
	serverSetting();
	serverDefaultRouter();
}

serverInit();

export default app;

const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app);
exports.handler = (event, context) => { awsServerlessExpress.proxy(server, event, context) }