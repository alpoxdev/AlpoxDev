import { types, Instance, getParent } from 'mobx-state-tree';
import { AuthRepository } from 'repository';
import { login, register } from 'common/models';
import { onRefreshAxios } from 'common/axios';
import { IStore } from 'stores';

import { onParseJWT, onSetUserData } from 'utils';

const onLogined = (self, props: any): void => {
  const rootStore: IStore = getParent(self);
  const { userStore } = rootStore;

  const accessToken = props?.accessToken;
  let user = null;
  if (accessToken) user = onParseJWT(accessToken);
  if (accessToken) userStore.setLogined(accessToken || null, user);

  onSetUserData(accessToken, user);
};

export const AuthStore = types
  .model('AuthStore', {
    login,
    register,
  })
  .actions((self) => ({
    onLogin: (props) =>
      self.login.onCreate(() => AuthRepository.onLogin(props), null, {
        actions: { ready: (props) => onLogined(self, props) },
      }),
    onRegister: (props) => self.register.onCreate(() => AuthRepository.onRegister(props)),
  }));

const authStore = AuthStore.create();

export type IAuthStore = Instance<typeof authStore>;

export default authStore;
