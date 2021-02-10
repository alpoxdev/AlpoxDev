import React from 'react';

// stores
import { MSTProps } from 'stores';

export const PostDetailContainer = ({ store }: MSTProps): JSX.Element => {
  return <>{JSON.stringify(store.postStore.post.toJSON())}</>;
};
