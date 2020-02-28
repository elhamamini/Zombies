import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchAllConversations,
  filterConversations,
} from '../../redux/conversations/thunks';
import * as Container from '../styled/Div';
import * as Font from '../styled/Font';
import * as Card from './Card';
import { Pill } from '../styled/Pill';
import whitelist from '../../../whitelist';

function AllConvos(props) {
  const [page, setPage] = useState(0);
  const [selectedTag, setSelected] = useState('');
  const convosList = useSelector(state => state.allConversations);
  const dispatch = useDispatch();

  const handleClick = id => {
    props.history.push(`/discussion/${id}`);
  };

  const handleFilter = tag => {
    if (selectedTag == tag) {
      setSelected('');
      dispatch(fetchAllConversations(0));
    } else {
      setSelected(tag);
      dispatch(filterConversations([tag]));
    }
  };

  useEffect(() => {
    dispatch(fetchAllConversations(0));
  }, []);

  return (
    <Container.Paper id="conversations-index">
      <Font.Header>Learn. Discuss. Get Help.</Font.Header>
      <Font.Paragraph>
        LearnDot forums are a great way to get help from your peers.
      </Font.Paragraph>
      <Font.Title>Popular Topics</Font.Title>
      <Card.CardContainer>
        {Object.keys(whitelist).map(key => (
          <Pill
            key={key}
            id={key}
            selected={key === selectedTag}
            onClick={() => handleFilter(key)}
          >
            {key}
          </Pill>
        ))}
      </Card.CardContainer>
      <Card.CardContainer>
        {convosList.map(convo => (
          <Card.Card key={convo.id} onClick={() => handleClick(convo.id)}>
            <Font.Paragraph>{convo.title}</Font.Paragraph>
            {convo.replyCount ? (
              <Font.Label>{`${convo.replyCount} ${
                convo.replyCount > 1 ? 'replies' : 'reply'
              }`}</Font.Label>
            ) : (
              <Font.Label secondary>No replies</Font.Label>
            )}
            {convo.hasAnswer && <Font.Label>Answered</Font.Label>}
          </Card.Card>
        ))}
      </Card.CardContainer>
    </Container.Paper>
  );
}

export default AllConvos;
