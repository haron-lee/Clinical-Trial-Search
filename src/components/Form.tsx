import React from 'react';
import Input from './Input';
import Button from './Button';
import { styled } from 'styled-components';

const Form: React.FC = () => {
  return (
    <StyledForm>
      <Input />
      <Button>검색</Button>
    </StyledForm>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex: auto;
`;

export default Form;
