import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllConversations, filterConversations } from '../../redux/conversations/thunks';
import { fetchTags } from '../../redux/tags/thunks';
import * as Container from '../styled/Div';
import * as Font from '../styled/Font';
import * as Card from './Card';
import * as InputField from '../styled/Input';
import { Pill } from '../styled/Pill';
import { extractTokens } from '../../utils';
import CollapsePanel from './CollapsePanel';

function AllConvos(props) {
  const [page, setPage] = useState(0);
  const [selectedTags, setTags] = useState([]);
  const [searchStr, setSearch] = useState('');
  const convosList = useSelector(state => state.allConversations);
  const activeTags = useSelector(state => state.tags);
  const whiteList = activeTags.reduce((accum, curr) => {
    accum[curr.name] = curr.id;
    return accum;
  }, {});
  const dispatch = useDispatch();

  const handleClick = id => {
    props.history.push(`/discussion/${id}`);
  };

  const handleChange = (body) => {
    //if search is clear, clear all the tags
    if (!body.length) {
      setTags([]);
    } else {
      const searchTags = extractTokens(body, whiteList);
      //if we pulled at least one tag out of the current input string
      if (searchTags.length) {
        //create a set of the selectedTags and the searchTag
        const uniqueTags = new Set([...searchTags, ...selectedTags]);
        const combinedTags = [...uniqueTags];
        setTags(combinedTags);
      }
    }
    setSearch(body);
  };

  const handleFilter = (tag) => {
    let updatedTags = [...selectedTags];
    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter(t => t !== tag);
    } else {
      updatedTags.push(tag);
    }
    setTags(updatedTags);
  };

  useEffect(() => {
    if (!activeTags.length) {
      dispatch(fetchTags());
    }
    if (!selectedTags.length) {
      dispatch(fetchAllConversations(page));
    } else {
      dispatch(filterConversations(selectedTags))
    }
  }, [selectedTags]);


  return (
    <Container.Paper id="conversations-index">
      <Font.Hero>Discuss. Develop. Learn.</Font.Hero>
      <Font.Paragraph>
        LearnDot forums are a great way to get help from your peers.
      </Font.Paragraph>
      <InputField.SearchInput
        type="text"
        name="search"
        placeholder="Search for your question"
        value={searchStr}
        onChange={e => handleChange(e.target.value)}
      />
      <CollapsePanel title={'Popular Topics'} >
        <Card.CardContainer>
          {
              activeTags.map(tag => (
              <Pill
                  key={tag.id}
                  selected={selectedTags.includes(tag.name)}
                  onClick={() => handleFilter(tag.name)}
              >
                  {tag.name}
              </Pill>))
          }
        </Card.CardContainer>
      </CollapsePanel>
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
};

export default AllConvos;
