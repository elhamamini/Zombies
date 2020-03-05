import React from 'react';
import { connect } from 'react-redux';
import {
  fetchAllReplies,
  updateReply,
  deleteReply,
} from '../redux/replies/thunks';
import { fetchUsers } from '../redux/users/thunks';
import * as Container from './styled/Div';
import * as Font from './styled/Font';
import * as Card from './styled/card';
import { SmallButton } from './styled/Button';
import { HrBlue } from './styled/Div';
import { Checkbox, NewLabel, Span } from './styled/Input';
import { FormCheckbox } from './styled/Form';
// import NotFound from './404Page';

class FlaggedReplies extends React.Component {
  constructor() {
    super();
    this.state = {
      isFlagged: true,
    };
  }

  componentDidMount() {
    this.props.getReplies();
    this.props.getUsers();
  }
  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevProps.replies.length !== this.props.replies.length) {
  //     this.props.getReplies();
  //   }
  // };

  updateReplyHandler = reply => {
    this.props.updateReply(reply, reply.id);
  };
  render() {
    console.log('user', this.props.user.userType);
    // return this.props.user.userType === 'admin' ? (
    return (
      <Container.Paper id="conversations-index">
        <Font.Hero>Flagged Replies</Font.Hero>
        <Card.CardContainer>
          {this.props.replies.map((reply, id) => (
            <Card.Card key={reply.id}>
              <Font.Header>Conversation Title:</Font.Header>
              <Font.Paragraph>{reply.conversation.title}</Font.Paragraph>
              <HrBlue />
              <Font.Header>User name:</Font.Header>
              <Font.Paragraph>
                {this.props.users.length &&
                  this.props.users.find(user => user.id === reply.userId).name}
              </Font.Paragraph>
              <HrBlue />
              <Font.Header>Flagged Reply:</Font.Header>
              <Font.Paragraph>{reply.body}</Font.Paragraph>

              <SmallButton
                onClick={() => {
                  this.props.updateReply(
                    {
                      ...reply,
                      isFlagged: false,
                    },
                    reply.id
                  );
                }}
              >
                unflagged
              </SmallButton>
              <SmallButton
                onClick={() => {
                  this.props.deleteReply(reply.id);
                }}
              >
                Delete
              </SmallButton>
            </Card.Card>
          ))}
        </Card.CardContainer>
      </Container.Paper>
    );
    // ) : (
    //   <NotFound />
    //   );
  }
}
const mapStateToProps = ({ replies, users, user }) => ({
  replies,
  users,
  user,
});
const mapDispatchToProps = dispatch => {
  return {
    getReplies: () => dispatch(fetchAllReplies()),
    getUsers: () => dispatch(fetchUsers()),
    updateReply: (reply, id) => dispatch(updateReply(reply, id)),
    deleteReply: id => dispatch(deleteReply(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(FlaggedReplies);
