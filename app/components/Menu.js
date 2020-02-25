import React, { Component } from 'react';

import Button from './styled/Button';
import { MenuContainer, Menu, MenuItem } from './styled/Menu';
import { Hr } from './styled/Div';

export default class extends Component {
  handleOnClick = e => {
    e.preventDefault();
  };

  render() {
    return (
      <MenuContainer>
        <Menu>
          <Button onClick={this.handleOnClick}>Start a Conversation</Button>
          <MenuItem to="/">Latest Conversations</MenuItem>
          <MenuItem to="/">Bookmarked</MenuItem>
          <MenuItem to="/"> Conversations for you</MenuItem>
          <Hr />
          <MenuItem to="/">Content buckets</MenuItem>
        </Menu>
      </MenuContainer>
    );
  }
}
