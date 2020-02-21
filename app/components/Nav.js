import React from "react";
import { Row } from "./styled/Div";
import { Nav, NavLink, NavButton } from "./styled/Nav";

//TODO: Remove NavLinks On SignUp and Login
export default () => {
  return (
    <Nav>
      <Row>
        <Row>
          <div>LOGO</div>
        </Row>
        <Row flexEnd>
          <NavLink href="/">Link</NavLink>
          <NavLink href="/">Link</NavLink>
          <NavLink href="/">Link</NavLink>
        </Row>
      </Row>

      <Row flexEnd>
        <NavButton href="/login">Login</NavButton>
        <NavButton href="/">Signup</NavButton>
      </Row>
    </Nav>
  );
};
