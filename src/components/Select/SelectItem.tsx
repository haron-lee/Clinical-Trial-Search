import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { styled } from 'styled-components';

type SelectItemProps = {
  children: React.ReactNode;
};

const SelectItem: React.FC<SelectItemProps> = ({ children }) => {
  return (
    <StyledItem>
      <AiOutlineSearch size='34' />
      <StyledButton>{children}</StyledButton>
    </StyledItem>
  );
};

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StyledButton = styled.button`
  font-size: 20px;
`;

export default SelectItem;
