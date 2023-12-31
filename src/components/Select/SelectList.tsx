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
      {disease.length === 0 ? (
        <NoKeyword>검색어 없음</NoKeyword>
      ) : (
        disease.map((diseaseItem, index) => {
          const isSelected = index === selectedIndex;
          return (
            <SelectItem key={diseaseItem.sickCd} disease={diseaseItem} $isSelected={isSelected} />
          );
        })
      )}
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

const NoKeyword = styled.p`
  color: var(--gray-800);
`;

export default SelectList;
