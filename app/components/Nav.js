import React from 'react';
import { Row } from './styled/Div';
import { Nav, NavLink, NavButton } from './styled/Nav';

//TODO: Remove NavLinks On SignUp and Login
export default () => {
  return (
    <Nav>
      <Row>
        <Row>
          <div>LOGO</div>
        </Row>
        <Row flexEnd>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/codeeditor'>CodeEditor</NavLink>
          <NavLink to='/'>Link</NavLink>
        </Row>
      </Row>

      <Row flexEnd>
        <NavButton to="/login">Login</NavButton>
        <NavButton to="/">Signup</NavButton>
      </Row>
    </Nav>
  );
};
