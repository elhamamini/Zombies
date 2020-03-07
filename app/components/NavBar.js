import React from 'react';
import { connect } from 'react-redux';
import { Row } from './styled/Div';
import { Nav, NavLink, NavButton, NavRow } from './styled/Nav';
import { attemptLogout } from '../redux/authentication/thunks';

//TODO: Remove NavLinks On SignUp and Login
const NavBar = props => {
  console.log('user', props.user.userType);
  return (
    <Nav>
          <NavLink to="/">
            <img src="https://zombieforums.nyc3.cdn.digitaloceanspaces.com/logo.png" height="40" width="40" alt="circle" />
          </NavLink>
          {props.user.name && <NavLink to="/new">New Post</NavLink>}
          {props.user.userType === 'admin' ? (
            <NavLink to="/flagged">Flagged Replies</NavLink>
          ) : null}
          {props.user.userType === 'admin' ? (
            <NavLink to="/last">List of new conversations</NavLink>
          ) : null}

        {props.user.name ? (
          <NavRow flexEnd>
            <NavLink to="/userprofile">{props.user.name}</NavLink>
            <NavButton to="/" onClick={() => props.logout()}>
              Logout
            </NavButton>
          </NavRow>
        ) : (
          <NavRow flexEnd>
            <NavButton to="/login">Login</NavButton>
            <NavButton to="/signup">Signup</NavButton>
          </NavRow>
        )}
    </Nav>
  );
};

const mapStateToProps = ({ user }) => ({ user });
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(attemptLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
