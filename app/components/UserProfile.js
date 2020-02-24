import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getActiveUser } from '../redux/activeUser/thunks';
import { Form } from './styled/Form';
import { MainContainer } from './styled/Div';
import { Image } from './styled/Image';
import { Header, Title, Paragraph } from './styled/Font';
import Button from './styled/Button';
import SmallButton from './styled/SmallButton';
class UserProfile extends Component {
  render() {
    console.log('activeUser', this.props.activeUser);
    const { activeUser } = this.props;
    return (
      <MainContainer>
        <Form>
          {activeUser.image ? (
            <Image src={activeUser.image} />
          ) : (
            <Image src="https://cdn3.iconfinder.com/data/icons/iconset-1-1/24/icon_set_outlinder-05-512.png" />
          )}
          <Header>{activeUser.name}</Header>
          <Title>{activeUser.email}</Title>
          <SmallButton>Edit Profile</SmallButton>
          {activeUser.bio ? <Paragraph>{activeUser.bio}</Paragraph> : null}
        </Form>
      </MainContainer>
    );
  }
}
const mapStateToProps = ({ activeUser }) => ({ activeUser });
export default connect(mapStateToProps)(UserProfile);
