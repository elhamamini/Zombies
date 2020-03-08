import React from 'react';
import { connect } from 'react-redux';

import { Nav, NavLink, NavButton, NavRow } from './styled/Nav';
import { Button } from './styled/Button';

import { attemptLogout } from '../redux/authentication/thunks';

const NavBar = props => {
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
            <Button onClick={() => props.logout(props.user.id)}>
              Logout
            </Button>
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
  logout: id => dispatch(attemptLogout(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
