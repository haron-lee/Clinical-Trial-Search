import React, { useEffect, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { debounce } from 'lodash';
import Form from 'components/Form';
import SelectList from 'components/Select/SelectList';
import { getKeyword } from 'api/search';
import { Disease } from 'types';
import { useInputKeywordContext } from 'context/useInputKeywordContext';

const Home: React.FC = () => {
  const [disease, setDisease] = useState<Disease[]>(() => []);
  const { inputKeyword } = useInputKeywordContext();

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

  return (
    <Wrapper>
      <h1>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </h1>
      <Form />
      <SelectList disease={disease} />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  max-width: 700px;
  margin: 100px auto;

  h1 {
    margin-bottom: 20px;
    font-weight: bold;
    font-size: 36px;
    text-align: center;
    line-height: 1.6;
  }
`;

export default Home;
