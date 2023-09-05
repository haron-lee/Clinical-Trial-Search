import React from 'react';
import { styled } from 'styled-components';

type ButtonProps = {
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <StyledButton>{children}</StyledButton>;
};

const StyledButton = styled.button`
  padding: 21px 25px;
  border-top-right-radius: 30px;
  border-bottom-right-radius: 30px;
  background-color: var(--primary);
  color: white;
  font-size: 20px;
  box-sizing: border-box;
`;

export default Button;
