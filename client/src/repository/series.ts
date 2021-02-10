import { onRequest, RequestMethod, Response, Query, Params } from 'common/axios';

export class SeriesRepository {
  static async onGetSeriesList({ query }: { query?: Query }): Promise<Response> {
    const url = '/series';
    return await onRequest({ method: RequestMethod.get, url, query });
  }

  static async onGetSeries({ id, query }: { id: number; query?: Query }): Promise<Response> {
    const url = `/series/${id}`;
    return await onRequest({ method: RequestMethod.get, url, query });
  }
}
