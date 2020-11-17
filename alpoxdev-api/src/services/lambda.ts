import { APIGatewayProxyEvent } from 'aws-lambda';
import { getError } from './error'; 
import { parsePageQuery } from './query';

export interface CustomResponseType{
    status: number;
    body?: object | string | null;
    headers?: object;
}

export interface ResponseType{
    statusCode?: number;
    body?: string;
    headers?: object;
}

export interface Request{
    headers?: any;
    params?: any;
    query?: any;
    body?: any;
}

export type Response = ({ status, body, headers }: CustomResponseType) => ResponseType;

const getResponse: Response = ({ status, body, headers }: CustomResponseType) => {
    let responseBody = '';

    if(typeof body === 'object'){
        responseBody = JSON.stringify(body);
    }
    if(typeof body === 'string'){
        responseBody = body;
    }

    return{
        statusCode: status,
        body: responseBody,
        headers : {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': '*',
            ...headers,
        }
    } as ResponseType;
}

export const createGatewayProxyHandler = (
    handler: (req: Request, res: Response, ...args: Array<any>) => Promise<ResponseType>) => {
        return async(event: APIGatewayProxyEvent) => {
            const { body, headers, pathParameters, queryStringParameters } = event;
            const query = { ...queryStringParameters, ...parsePageQuery(queryStringParameters) };

            const req = {
                body: JSON.parse(body as string || '{}'),
                params : pathParameters,
                query,
                headers
            } as Request;
            const res = getResponse;

            try{
                return await handler(req, res);
            }catch(error){
                const { status = 404, body } = getError(error?.status, error?.message);
                console.log(status, body);

                return getResponse({
                    status,
                    body
                })
            }
        }
}