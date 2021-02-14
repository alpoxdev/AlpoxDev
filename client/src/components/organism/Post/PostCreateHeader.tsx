import {} from 'react';
import styled from '@emotion/styled';

import { Input } from 'components';
import { PostCreateHeaderProps } from 'common/types';

const CreateHeader = ({ input, onChange, onTagEnter }: PostCreateHeaderProps): JSX.Element => {
  return (
    <HeaderWrapper>
      <TitleInput name="title" value={input.title} onChange={onChange} placeholder="제목 입력" />
      <SubTitleInput
        name="subtitle"
        value={input.subtitle}
        onChange={onChange}
        placeholder="부제목 입력"
      />
      <TagInput
        name="tagInput"
        value={input.tagInput}
        onChange={onChange}
        placeholder="태그 입력"
        onKeyDown={onTagEnter}
      />
    </HeaderWrapper>
  );
};

export default CreateHeader;

const HeaderWrapper = styled.div`
  width: 100%;
  padding: 21px 6px;
`;

const TitleInput = styled(Input)`
  width: 100%;
  font-size: 32px;
`;

const SubTitleInput = styled(Input)`
  width: 100%;
  font-size: 24px;
`;

const TagInput = styled(Input)`
  width: 100%;
  font-size: 16px;
`;
