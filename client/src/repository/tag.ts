import { onRequest, RequestMethod, Response, Query, Params } from 'common/axios';

export class TagRepository {
  static async onGetTags({ query }: { query?: Query }): Promise<Response> {
    const url = '/tags';
    return await onRequest({ method: RequestMethod.get, url, query });
  }

  static async onGetTag({ id, query }: { id: number; query?: Query }): Promise<Response> {
    const url = `/tags/${id}`;
    return await onRequest({ method: RequestMethod.get, url, query });
  }
}
