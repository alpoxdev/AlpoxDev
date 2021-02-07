import { Instance, IAnyModelType } from 'mobx-state-tree';
import { Response } from 'common/axios';

export function onPromise<T extends IAnyModelType>(self: Instance<T>) {
    return function* generator(
        promise: (props?: any) => Promise<Response>,
        key?: string | null,
        isMore = false,
    ) {
        self.onPending();

        const response: Response = yield promise();
        if (response.status >= 200 && response.status < 300) {
            if (isMore) {
                key
                    ? self.onMore(response.data[key], response.data?.count)
                    : self.onMore(response.data, response.data?.count);
            } else {
                key
                    ? self.onReady(response.data[key], response.data?.count)
                    : self.onReady(response.data, response.data?.count);
            }
        } else {
            self.onError(response);
        }
    };
}
