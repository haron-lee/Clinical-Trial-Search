import React, { useState, useCallback, useEffect } from 'react';
import { styled } from 'styled-components';
import Input from './Input';
import Button from './Button';
import SelectList from 'components/Select/SelectList';
import { getKeyword } from 'api/search';
import { Disease } from 'types';
import { useInputKeywordContext } from 'context/useInputKeywordContext';
import useCachedData from 'hooks/useCachedData';
import { DELAY_TIME } from 'utils/constants';

const Search: React.FC = () => {
  const { inputKeyword } = useInputKeywordContext();
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    setSelectedIndex(-1);
  }, [inputKeyword]);

  const fetcher = useCallback(() => getKeyword(inputKeyword), [inputKeyword]);
  const disease: Disease[] = useCachedData(inputKeyword, fetcher, DELAY_TIME) || [];

  const navigateGoogleSearch = (url: string) => {
    window.open(url, '_blank', 'noopener, noreferrer');
  };

  const moveKeyword = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown' && event.key !== 'Enter') return;
    if (event.nativeEvent.isComposing) return;

    if (disease.length > 0) {
      switch (event.key) {
        case 'ArrowUp':
          setSelectedIndex((prevIndex) => (prevIndex <= 0 ? disease.length - 1 : prevIndex - 1));
          break;
        case 'ArrowDown':
          setSelectedIndex((prevIndex) => (prevIndex >= disease.length - 1 ? 0 : prevIndex + 1));
          break;
        case 'Enter':
          if (disease[selectedIndex]) {
            navigateGoogleSearch(
              `https://www.google.com/search?q=${disease[selectedIndex].sickNm}`,
            );
          }
          break;
        default:
      }
    }
  };

  return (
    <>
      <StyledSearchLayout>
        <Input onKeyDown={moveKeyword} />
        <Button>검색</Button>
      </StyledSearchLayout>
      <SelectList disease={disease} selectedIndex={selectedIndex} />
    </>
  );
};

const StyledSearchLayout = styled.div`
  display: flex;
  flex: auto;
`;

export default Search;
