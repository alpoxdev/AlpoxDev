import React from 'react';
import * as styled from './styled';

import { useScrollBottom } from 'lib/hooks';

export default function PostLoading({ pending = false, getPosts }){
  const animation = useScrollBottom(pending, getPosts);
  if(!pending) return <div {...animation}/>;

  return(
    <styled.PostLoading>
      <styled.Loading>
        
      </styled.Loading>
    </styled.PostLoading>
  )
}