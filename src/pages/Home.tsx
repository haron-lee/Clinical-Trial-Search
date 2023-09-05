import React from 'react';
import { styled } from 'styled-components';
import Form from 'components/Form';
import SelectList from 'components/Select/SelectList';

const Home: React.FC = () => {
  return (
    <Wrapper>
      <h1>
        국내 모든 임상시험 검색하고 <br /> 온라인으로 참여하기
      </h1>
      <Form />
      <SelectList />
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
