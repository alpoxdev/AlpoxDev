import React from 'react';

// stores
import { inject, observer } from 'mobx-react';
import { useStore } from 'stores';

// helmet
import { Helmet } from 'components';
import { customHelmet as helmet } from 'common/helmet';

// container
import { PostCreateContainer } from 'containers';

const PostCreatePage = (): JSX.Element => {
  const store = useStore();

  return (
    <>
      <Helmet
        helmet={helmet({
          title: '글 업로드 - AlpoxDev',
        })}
      />
      <PostCreateContainer store={store} />
    </>
  );
};

export default inject('store')(observer(PostCreatePage));
