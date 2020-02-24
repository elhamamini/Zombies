import React from 'react';
import { Row } from './styled/Div';
import { connect } from 'react-redux';
import { Nav, NavLink, NavButton } from './styled/Nav';

//TODO: Remove NavLinks On SignUp and Login
class NavBar extends React.Component {
  render() {
    return (
      <Nav>
        <Row>
          <Row>
            <div>LOGO</div>
          </Row>
          <Row flexEnd>
            <NavLink href="/" to="/">
              Home
            </NavLink>
            {this.props.activeUser ? (
              <NavLink to={'/userprofile'}> Your Profile</NavLink>
            ) : null}
            <NavLink href="/" to="/">
              Link
            </NavLink>
          </Row>
        </Row>

        <Row flexEnd>
          <NavButton to="/login">Login</NavButton>
          <NavButton to="/">Signup</NavButton>
        </Row>
      </Nav>
    );
  }
}
const mapStateToProps = ({ activeUser }) => ({ activeUser });

export default connect(mapStateToProps)(NavBar);
