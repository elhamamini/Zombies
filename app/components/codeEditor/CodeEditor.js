import React from 'react';

import Tabulation from './Tabulation';
import Output from './Output';

import { MainContainer } from '../styled/Div';

const CodeEditor = () => {
  return (
    <MainContainer>
      <Tabulation />
      <Output />
    </MainContainer>
  );
};

export default CodeEditor;
