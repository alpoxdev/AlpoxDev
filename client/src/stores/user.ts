import { types, Instance } from 'mobx-state-tree';
import { User, IUser } from 'common/models';

export const UserStore = types
  .model('UserStore', {
    accessToken: types.optional(types.maybe(types.maybeNull(types.string)), null),
    user: types.optional(types.maybeNull(User), null),
  })
  .views((self) => ({
    get checkIsLogined() {
      return !!self.accessToken;
    },
  }))
  .actions((self) => ({
    setLogined: (accessToken: string, user?: IUser) => {
      self.accessToken = accessToken;
      if (user) self.user = user;
    },
  }));
