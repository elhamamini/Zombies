import React, { Component } from 'react';

import { MainContainer } from './styled/Div';

import Menu from './Menu';
import NewConversation from './ConversationComponents/NewConversation';

export default () => {
  return (
    <MainContainer>
      <Menu />
      <NewConversation />
    </MainContainer>
  );
}
