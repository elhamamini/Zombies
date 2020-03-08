import React from 'react';
import { connect } from 'react-redux';

import { fetchAllConversations } from '../redux/conversations/thunks';
import * as Container from './styled/Div';
import * as Font from './styled/Font';
import * as Card from './styled/card';
import * as Button from './styled/Button';

import NotFound from './404Page';

class LatestTitleList extends React.Component {

  componentDidMount() {
    this.props.getConversations(0);
  }

  checkDate = date => {
    let count = 0;
    let datesArr = [];
    while (count <= 7) {
      let current_datetime = new Date();
      let current_nextDatetime = new Date(current_datetime);
      current_nextDatetime.setDate(current_nextDatetime.getDate() - count);
      let dd = current_nextDatetime.getDate();
      let mm = current_nextDatetime.getMonth() + 1;
      let yy = current_nextDatetime.getFullYear();
      if (dd < 10) {
        dd = '0' + dd;
      }

      if (mm < 10) {
        mm = '0' + mm;
      }
      let formatted_date = yy + '-' + mm + '-' + dd;

      datesArr.push(formatted_date);
      count++;
    }
    if (datesArr.includes(date)) {
      return true;
    }
    return false;
  };

  render() {
    let currentConversationsList = this.props.allConversations.filter(conve => {
      return this.checkDate(conve.createdAt.split('T')[0]);
    });

    return this.props.user.userType === 'admin' ? (
      <Container.Paper id="conversations-index">
        <Font.hero>New Conversations</Font.hero>
        <Card.CardContainer>
          {currentConversationsList.map(convo => (
            <Card.Card key={convo.id}>
              <Font.Paragraph>{convo.title}</Font.Paragraph>

              {/* {convo.hasAnswer && <Font.Label>Answered</Font.Label>} */}
            </Card.Card>
          ))}
        </Card.CardContainer>
      </Container.Paper>
    ) : (
      <NotFound />
    );
  }
}

const mapStateToProps = ({ allConversations, user }) => ({
  allConversations,
  user,
});

const mapDispatchToProps = dispatch => {
  return {
    getConversations: p => dispatch(fetchAllConversations(p)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LatestTitleList);
