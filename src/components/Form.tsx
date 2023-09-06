import React from 'react';
import { styled } from 'styled-components';
import Input from './Input';
import Button from './Button';

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
