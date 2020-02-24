import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActiveUser } from '../redux/activeUser/thunks';
import { Form } from './styled/Form';
import { MainContainer } from './styled/Div';
import { Image } from './styled/Image';
class UserProfile extends Component {
  render() {
    return (
      <MainContainer>
        <Form>
          <Image src={activeUser.image} />
        </Form>
      </MainContainer>
    );
  }
}
const mapStateToProps = ({ activeUser }) => ({ activeUser });
export default connect(mapStateToProps)(UserProfile);
