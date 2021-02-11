import React from 'react';

// stores
import { inject, observer } from 'mobx-react';
import { useStore } from 'stores';

// helmet
import { Helmet } from 'components';
import { customHelmet as helmet } from 'common/helmet';

// container
import { AuthLoginContainer } from 'containers';

const AuthLoginPage = (): JSX.Element => {
  const store = useStore();

  return (
    <>
      <Helmet
        helmet={helmet({
          title: '로그인 - AlpoxDev',
        })}
      />
      <AuthLoginContainer store={store} />
    </>
  );
};

export default inject('store')(observer(AuthLoginPage));
