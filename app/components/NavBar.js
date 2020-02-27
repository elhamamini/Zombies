import React from 'react';
import { Row } from './styled/Div';
import { connect } from 'react-redux';
import { Nav, NavLink, NavButton } from './styled/Nav';

//TODO: Remove NavLinks On SignUp and Login
const NavBar = props => {
  console.log(props)
  return (
    <Nav>
      <Row>
        <Row>
          <div>LOGO</div>
        </Row>
        <Row flexEnd>
          <NavLink to="/">Home</NavLink>
            {
              props.activeUser
              ? <NavLink to='/userprofile'> Your Profile</NavLink>
              : null
            }
        </Row>
      </Row>

      <Row flexEnd>
        {
          props.activeUser
          ? <div>Hey, { props.activeUser.name }</div>
          : <NavButton to="/login">Login</NavButton>
        }
        <NavButton to="/">Signup</NavButton>
      </Row>
    </Nav>
  );
}

const mapStateToProps = ({ activeUser }) => ({ activeUser });

export default connect(mapStateToProps)(NavBar);
