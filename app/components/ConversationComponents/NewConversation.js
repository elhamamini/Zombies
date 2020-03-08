import React, { Component } from 'react';
import { connect } from 'react-redux';
import nlp from 'compromise';

import { MainContainer } from '../styled/Div';
import * as Font from '../styled/Font';
import * as Form from '../styled/Form';
import * as Input from '../styled/Input';
import { Button } from '../styled/Button';
import { Select, Option } from '../styled/Select';
import { Pill, PillContainer } from '../styled/Pill';
import { NavSpan } from '../styled/Nav';

import { fetchRepos } from '../../redux/repository/thunks';
import {
  createConversation,
  fetchCurrentConversation,
} from '../../redux/conversations/thunks';
import { createReply } from '../../redux/replies/thunks';
import draftBody from '../../redux/body/actions';

import Editor from './Editor';

import { extractTokens, pruneHTML } from '../../utils';
import Axios from 'axios';

let whiteList = {};

class NewConversation extends Component {
  constructor() {
    super();
    this.state = {
      repo: '',
      topic: '',
      errors: {
        topicError: '',
        bodyError: '',
      },
      tags: [],
      isLoading: false,
    };
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.validate(name, value);
    });
  };

  handleOnClick = async(e) => {
    e.preventDefault();
    this.setState({ isLoading: true })

    const cleanText = pruneHTML(this.props.body.bodyText);
    const mlTag = (await Axios.post('/api/ml/classify', { doc: cleanText })).data;
    const tagList = this.props.tags.filter(t => t.name === mlTag);
    console.log('mlTag', mlTag);
    console.log('tagList', tagList);
    this.props.createConversation({
      userId: this.props.user.id,
      title: this.state.topic,
      tags: tagList,
    })
    .then(() => {
      this.props.createReply({
        conversationId: this.props.conversation.id,
        userId: this.props.user.id,
        body: this.props.body.bodyText,
        htmlCode: this.props.body.codeBlocks['.language-html'],
        cssCode: this.props.body.codeBlocks['.language-css'],
        javascriptCode: this.props.body.codeBlocks['.language-js'],
        repo: this.state.repo,
        tags: tagList,
    })
  })
    .then(() => {
      this.setState({ isLoading: false })
      this.props.draftBody('', {})
    })
    .then(() => this.props.history.push(`/conversations/${this.props.conversation.id}`))
  };

  generateTags = value => {
    const { tags } = this.state;
    const newTags = tags;
    //run compromise on body content
    let postTopics = nlp(value)
      .normalize({ plurals: true, parentheses: true })
      .nouns();
    //loop through returned terms
    postTopics.out('freq').forEach(term => {
      //if term is NOT already in the tags list and IS in the whitelist, add it
      if (!newTags.includes(term.reduced) && whiteList[term.reduced]) {
        newTags.push(term.reduced);
      }
    });
    if (newTags.length > tags.length) {
      this.setState({ tags: newTags });
    }
  };

  validate = (name, value) => {
    const { errors } = this.state;
    switch (name) {
      case 'topic':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              topicError: 'Required field',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              topicError: '',
            },
          });
        }
        break;

      case 'body':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              bodyError: 'Required field',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              bodyError: '',
            },
          });
        }
        break;
    }
  };

  render() {
    const {
      topic,
      tags,
      errors,
      errors: { topicError, bodyError },
    } = this.state;

    return (
      <MainContainer>
        {/* <Link to="postpage">Post Page</Link> */}
        <Form.Container>
          <Font.h1>New Conversation</Font.h1>
          <Font.h4>Topic</Font.h4>
          <Input.TextInput
            type="text"
            name="topic"
            placeholder="Help installing Testem"
            value={topic}
            onChange={ev => this.setState({ topic: ev.target.value })}
          />
          <Input.InputFeedback>{topicError}</Input.InputFeedback>
          {this.props.repositories.length && this.props.user.githubUsername ? (
            <div>
              <label>Add repository link to your Conversation:</label>
              <Select
                id="repository"
                //since body is deprecated in the state we need to change this.
                onChange={ev => this.setState({ body: ev.target.value })}
              >
                {this.props.repositories.map(repo => {
                  return (
                    <Option key={repo.id} value={repo.html_url}>
                      {repo.name}
                    </Option>
                  );
                })}
              </Select>
            </div>
          ) : null}
          <Font.h4>Body</Font.h4>
          <Editor />
          <Input.InputFeedback>{bodyError}</Input.InputFeedback>
          <PillContainer>
            {tags.length ? tags.map(tag => <Pill key={tag}>{tag}</Pill>) : ''}
          </PillContainer>
          {
            this.props.user.id
            ? (
          <Button
            disabled={
              this.state.isLoading || !topic || !this.props.body.bodyText || Object.values(errors).some(val => !!val)
                ? true
                : false
            }
            onClick={this.handleOnClick}
          >
            Post New Conversation
          </Button>
            )
            : (
            <div>
              <NavSpan secondary to='/login'>Login</NavSpan> or <NavSpan secondary to='/signup'>Create an account</NavSpan> to join the conversation.
            </div>
            )
          }
        </Form.Container>
      </MainContainer>
    );
  }
}

const mapState = ({
  authentication,
  user,
  repositories,
  conversation,
  tags,
  body
}) => ({
  authentication,
  user,
  repositories,
  conversation,
  tags: tags.all,
  whitelist: tags.whitelist,
  body,
});

const mapDispatch = dispatch => ({
  createConversation: content => dispatch(createConversation(content)),
  createReply: content => dispatch(createReply(content)),
  fetchCurrentConversation: conversationId =>
    dispatch(fetchCurrentConversation(conversationId)),
  fetchRepos: () => dispatch(fetchRepos()),
  draftBody: () => dispatch(draftBody())
});

export default connect(mapState, mapDispatch)(NewConversation);
