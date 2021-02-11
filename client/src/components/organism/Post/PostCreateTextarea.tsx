import {} from 'react';
import styled from '@emotion/styled';
import { PostCreateTextAreaProps } from 'common/types';

const CreateTextarea = ({ value, onChange }: PostCreateTextAreaProps): JSX.Element => {
  return <Textarea value={value} onChange={onChange} />;
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
