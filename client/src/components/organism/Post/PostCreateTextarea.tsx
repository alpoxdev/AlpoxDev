import {} from 'react';
import styled from '@emotion/styled';
import { PostCreateTextAreaProps } from 'common/types';

const CreateTextarea = ({ value, onChange }: PostCreateTextAreaProps): JSX.Element => {
  return (
    <Textarea
      value={value}
      onChange={onChange}
      placeholder="내용을 작성하지 않으면 유혈사태가 일어날것입니다..."
    />
  );
};

export default CreateTextarea;

const Textarea = styled.textarea`
  width: 100%;
  min-height: calc(100vh - 128px);
  padding: 21px;
  background-color: transparent;

  display: block;

  border: 0;
  outline: 0px none transparent;
  box-shadow: none;
`;
