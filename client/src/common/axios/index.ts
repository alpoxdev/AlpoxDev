import axios, { AxiosInstance } from 'axios';
import queryString from 'query-string';
import { isSSR } from 'utils';

const ENDPOINT = 'https://e2ymj1zrwk.execute-api.ap-northeast-2.amazonaws.com/dev';
let instance = axios.create({});

export type Header = { [type: string]: string };
export type Query = { [type: string]: any };
export type Params = { [type: string]: any };
export type ResponseData = { [type: string]: any } | any;

export enum RequestMethod {
  get = 'GET',
  GET = 'GET',

  post = 'POST',
  POST = 'POST',

  delete = 'DELETE',
  DELETE = 'DELETE',

  patch = 'PATCH',
  PATCH = 'PATCH',

  put = 'PUT',
  PUT = 'PUT',
}

export type RequestProps = {
  method?: RequestMethod;
  url: string;
  headers?: Header;
  query?: Query;
  params?: Params;
};

export type Response = {
  status: number;
  data: ResponseData | null;
};
export type Error = Response;

export const onRefreshAxios = (axiosInstance: AxiosInstance) => {
  instance = axiosInstance;
};

export const onParseQuery = (query?: Query): string => {
  if (!query) return '';

  return queryString.stringify(query);
};

export const onRequest = async (props: RequestProps): Promise<Response> => {
  const { method } = props;
  props = { ...props, url: ENDPOINT + props.url };
  !isSSR() && console.log('onRequest', props);

  let response: Response;

  try {
    switch (method) {
      case RequestMethod.get:
        response = await onRequestGet(props);
        break;
      case RequestMethod.post:
        response = await onRequestPost(props);
        break;
      case RequestMethod.delete:
        response = await onRequestDelete(props);
        break;
      case RequestMethod.patch:
        response = await onRequestPatch(props);
        break;
      case RequestMethod.put:
        response = await onRequestPut(props);
        break;
      default:
        response = await onRequestGet(props);
        break;
    }

    !isSSR() && console.log(`onRequest Response ${props.url}`, response.data);
    return response;
  } catch (error) {
    !isSSR() && console.log('onRequest Error', error?.response);
    return { status: 500 } as Response;
  }
};

export const onRequestGet = async (props: RequestProps): Promise<Response> => {
  const { url, headers, query } = props;

  return await instance.get(url + onParseQuery(query), {
    headers,
  });
};

export const onRequestPost = async (props: RequestProps): Promise<Response> => {
  const { url, headers, query, params } = props;

  return await instance.post(url + onParseQuery(query), params, {
    headers,
  });
};

export const onRequestDelete = async (props: RequestProps): Promise<Response> => {
  const { url, headers, query, params } = props;

  return await instance.delete(url + onParseQuery(query), {
    headers,
    params,
  });
};

export const onRequestPatch = async (props: RequestProps): Promise<Response> => {
  const { url, headers, query, params } = props;

  return await instance.patch(url + onParseQuery(query), params, {
    headers,
  });
};

export const onRequestPut = async (props: RequestProps): Promise<Response> => {
  const { url, headers, query, params } = props;

  return await instance.put(url + onParseQuery(query), params, {
    headers,
  });
};
