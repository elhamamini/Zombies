import React from 'react';
import { connect } from 'react-redux';

import { Row } from './styled/Div';
import { Nav, NavLink, NavButton } from './styled/Nav';

//TODO: Remove NavLinks On SignUp and Login
const NavBar = props => {
  console.log(props);
  return (
    <Nav>
      <Row>
        <Row>
          <div>LOGO</div>
        </Row>
        <Row flexEnd>
          <NavLink to="/">Home</NavLink>
          {props.user.name ? (
            <NavLink to="/userprofile"> Your Profile</NavLink>
          ) : null}
        </Row>
      </Row>

      <Row flexEnd>
        {props.user.name ? (
          <Row flexEnd>
            <p>Hey, {props.user.name}</p>
            <NavButton to="/">Logout</NavButton>
          </Row>
        ) : (
          <Row flexEnd>
            <NavButton to="/login">Login</NavButton>
            <NavButton to="/signup">Signup</NavButton>
          </Row>
        )}
      </Row>
    </Nav>
  );
};

const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps)(NavBar);
