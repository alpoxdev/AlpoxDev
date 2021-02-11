import { Instance, IAnyModelType } from 'mobx-state-tree';
import { Response } from 'common/axios';

const onActions = async (actions: any, actionType: string, props?: any): Promise<void> => {
  console.log('onActions', actions, actionType);

  // pending
  if (actionType === 'pending' && 'pending' in actions) {
    const pendingActions = actions['pending'];
    if (pendingActions && Array.isArray(pendingActions)) {
      await Promise.all(
        pendingActions.map((action: any) => {
          if (typeof action === 'function') return action();
          return null;
        }),
      );
    }

    if (pendingActions && typeof pendingActions === 'function') {
      await pendingActions();
    }
  }

  // ready
  if (actionType === 'ready' && 'ready' in actions) {
    const readyActions = actions['ready'];
    if (readyActions && Array.isArray(readyActions)) {
      await Promise.all(
        readyActions.map((action: any) => {
          if (typeof action === 'function') return action(props);
          return null;
        }),
      );
    }

    if (readyActions && typeof readyActions === 'function') {
      await readyActions(props);
    }
  }

  // error
  if (actionType === 'error' && 'error' in actions) {
    const errorActions = actions['error'];
    if (errorActions && Array.isArray(errorActions)) {
      await Promise.all(
        errorActions.map((action: any) => {
          if (typeof action === 'function') return action(props);
          return null;
        }),
      );
    }

    if (errorActions && typeof errorActions === 'function') {
      await errorActions(props);
    }
  }
};

export function onPromise<T extends IAnyModelType>(self: Instance<T>) {
  return function* generator(
    promise: (props?: any) => Promise<Response>,
    key?: string | null,
    options?: { isMore?: boolean; actions: any },
  ): any {
    const isMore = options?.isMore || false;
    const actions = options?.actions || {};

    self.onPending();
    yield onActions(actions, 'pending');

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

      yield onActions(actions, 'ready', response.data);
    } else {
      self.onError(response);

      yield onActions(actions, 'error', response);
    }
  };
}
