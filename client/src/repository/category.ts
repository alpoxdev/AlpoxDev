import { onRequest, RequestMethod, Response, Query, Params } from 'common/axios';

export class CategoryRepository {
  static async onGetCategories({ query }: { query?: Query }): Promise<Response> {
    const url = '/categories';
    return await onRequest({ method: RequestMethod.get, url, query });
  }

  static async onGetCategory({ id, query }: { id: number; query?: Query }): Promise<Response> {
    const url = `/categories/${id}`;
    return await onRequest({ method: RequestMethod.get, url, query });
  }
}
