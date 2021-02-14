import {} from 'react';
import styled from '@emotion/styled';
import { PostCreateTextAreaProps } from 'common/types';

const CreateTextarea = ({ value, onChange }: PostCreateTextAreaProps): JSX.Element => {
  return (
    <Textarea
      name="content"
      value={value}
      onChange={onChange}
      placeholder="내용을 작성하지 않으면 유혈사태가 일어날것입니다..."
    />
  );
};

export default CreateTextarea;

const Textarea = styled.textarea`
  flex: 1;
  width: 100%;
  padding: 21px;
  padding-top: 10px;
  background-color: transparent;

  overflow-y: scroll;

  display: block;

  border: 0;
  outline: 0px none transparent;
  box-shadow: none;
`;
