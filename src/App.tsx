import GlobalStyle from 'GlobalStyle';
import React from 'react';
import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

export default App;
