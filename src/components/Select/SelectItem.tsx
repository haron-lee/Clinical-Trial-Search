import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { styled } from 'styled-components';
import { Disease } from 'types';

type SelectItemProps = {
  disease: Disease;
};

const SelectItem: React.FC<SelectItemProps> = ({ disease }) => {
  return (
    <StyledItem>
      <AiOutlineSearch size='34' />
      <StyledButton>{disease.sickNm}</StyledButton>
    </StyledItem>
  );
};

const StyledItem = styled.li`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  font-size: 20px;
`;

export default SelectItem;
