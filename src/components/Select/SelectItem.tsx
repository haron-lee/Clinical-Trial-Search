import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { css, styled } from 'styled-components';
import { Disease } from 'types';

type SelectItemProps = {
  disease: Disease;
  $isSelected: boolean;
};

const SelectItem: React.FC<SelectItemProps> = ({ disease, $isSelected }) => {
  return (
    <StyledItem $isSelected={$isSelected}>
      <AiOutlineSearch size='34' />
      <StyledButton>{disease.sickNm}</StyledButton>
    </StyledItem>
  );
};

const StyledItem = styled.li<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;

  ${(props) =>
    props.$isSelected &&
    css`
      background-color: var(--gray-100);
      border-radius: 10px;
    `}
`;

const StyledButton = styled.button`
  font-size: 20px;
`;

export default SelectItem;
