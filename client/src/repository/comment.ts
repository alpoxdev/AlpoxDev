import { onRequest, RequestMethod, Response, Query, Params } from 'common/axios';

export class CommentRepository {
  static async onCreateComment({ id, params }: { id: number; params?: Query }): Promise<Response> {
    const url = `/posts/${id}/comments`;
    return await onRequest({ method: RequestMethod.POST, url, params });
  }

  static async onGetComments({ id }: { id: number }): Promise<Response> {
    const url = `/posts/${id}/comments`;
    return await onRequest({ method: RequestMethod.GET, url });
  }
}
