import React from 'react';
import SelectItem from './SelectItem';
import { styled } from 'styled-components';
import { Disease } from 'types';

type SelectProps = {
  disease: Disease[];
  selectedIndex: number;
};

const SelectList: React.FC<SelectProps> = ({ disease, selectedIndex }) => {
  return (
    <StyledUl>
      <li>
        <StyledP>추천 검색어</StyledP>
      </li>
      {disease.slice(0, 10).map((disease, index) => {
        const isSelected = index === selectedIndex;
        return <SelectItem key={disease.sickCd} disease={disease} $isSelected={isSelected} />;
      })}
    </StyledUl>
  );
};

const StyledUl = styled.ul`
  margin-top: 10px;
  padding: 20px;
  border-radius: 20px;
  background-color: #fff;
`;

const StyledP = styled.p`
  margin-bottom: 15px;
  font-size: 16px;
  color: var(--gray-600);
`;

export default SelectList;
