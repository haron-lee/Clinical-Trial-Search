import React, { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { debounce } from 'lodash';
import Input from './Input';
import Button from './Button';
import SelectList from 'components/Select/SelectList';
import { getKeyword } from 'api/search';
import { Disease } from 'types';
import { useInputKeywordContext } from 'context/useInputKeywordContext';

const Form: React.FC = () => {
  const [disease, setDisease] = useState<Disease[]>(() => []);
  const { inputKeyword } = useInputKeywordContext();
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const visibleDisease = disease.slice(0, 10);

  const fetchData = useMemo(() => {
    return debounce(async (query: string) => {
      const keywords = await getKeyword(query);
      console.info('calling api');
      setDisease(() => keywords);
    }, 1000);
  }, []);

  useEffect(() => {
    if (inputKeyword.length === 0) {
      setDisease([]);
      return;
    }

    fetchData(inputKeyword);
  }, [inputKeyword, fetchData]);

  const navigateGoogleSearch = (url: string) => {
    window.open(url, '_blank', 'noopener, noreferrer');
  };

  const moveKeyword = (event: React.KeyboardEvent) => {
    if (event.key !== 'ArrowUp' && event.key !== 'ArrowDown' && event.key !== 'Enter') return;
    if (event.nativeEvent.isComposing) return;

    if (visibleDisease.length > 0) {
      switch (event.key) {
        case 'ArrowUp':
          setSelectedIndex((prevIndex) =>
            prevIndex <= 0 ? visibleDisease.length - 1 : prevIndex - 1,
          );
          break;
        case 'ArrowDown':
          setSelectedIndex((prevIndex) =>
            prevIndex >= visibleDisease.length - 1 ? 0 : prevIndex + 1,
          );
          break;
        case 'Enter':
          if (disease[selectedIndex]) {
            navigateGoogleSearch(
              `https://www.google.com/search?q=${disease[selectedIndex].sickNm}`,
            );
          }
          break;
        default:
          break;
      }
    }
  };
  return (
    <>
      <StyledForm>
        <Input onKeyDown={moveKeyword} />
        <Button>검색</Button>
      </StyledForm>
      <SelectList disease={disease} selectedIndex={selectedIndex} />
    </>
  );
};

const StyledForm = styled.div`
  display: flex;
  flex: auto;
`;

export default Form;
