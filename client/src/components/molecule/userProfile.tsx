import styled from '@emotion/styled';
import { SerializedStyles } from '@emotion/react';

import { UserProfileProps } from 'common/types';

export const UserProfile = ({ src, width, height, css }: UserProfileProps): JSX.Element => {
  return <ProfileImage src={src || '/logo.png'} width={width} height={height} css={css} />;
};

const ProfileImage = styled.img<{ width?: string; height?: string; css: SerializedStyles }>`
  width: ${(props) => props.width || '30px'};
  height: ${(props) => props.height || '30px'};
  border-radius: 100%;
  border: 1px solid #eaeaea;

  ${(props) => props.css};
`;
