import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from './styled/Form';
import { MainContainer } from './styled/Div';
import { Image } from './styled/Image';
import { Header, Title, Paragraph } from './styled/Font';
import SmallButton from './styled/SmallButton';

class UserProfile extends Component {
  render() {
    const { user } = this.props;
    return (
      <MainContainer>
        <Form>
          {
            user.image
            ? <Image src={user.image} />
            : <Image src="https://cdn3.iconfinder.com/data/icons/iconset-1-1/24/icon_set_outlinder-05-512.png" />
          }
          <Header>{user.name}</Header>
          <Title>{user.email}</Title>
          <SmallButton>Edit Profile</SmallButton>
          {user.bio ? <Paragraph>{user.bio}</Paragraph> : null}
        </Form>
      </MainContainer>
    );
  }
}
const mapStateToProps = ({ user }) => ({ user });

export default connect(mapStateToProps, null)(UserProfile);
