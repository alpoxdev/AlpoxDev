import { onRequest, RequestMethod, Response, Query, Params } from 'common/axios';

export class AuthRepository {
  static async onLogin({ params }: { params: Params }): Promise<Response> {
    const url = '/login';
    return await onRequest({ method: RequestMethod.post, url, params });
  }

  static async onRegister({ params }: { params: Params }): Promise<Response> {
    const url = '/register';
    return await onRequest({ method: RequestMethod.post, url, params });
  }
}
