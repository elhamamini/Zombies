import React, { Component } from 'react';

import { MainContainer } from './styled/Div';
import Menu from './Menu';
import NewConversation from './NewConversation';

class Home extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <MainContainer>
        <Menu />
        <NewConversation />
      </MainContainer>
    );
  }
}

export default Home;
