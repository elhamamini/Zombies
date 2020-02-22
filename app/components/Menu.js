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
          <MenuItem>Latest Conversations</MenuItem>
          <MenuItem>Bookmarked</MenuItem>
          <MenuItem>Conversations for you</MenuItem>
          <Hr />
          <MenuItem>Content buckets</MenuItem>
        </Menu>
      </MenuContainer>
    );
  }
}
