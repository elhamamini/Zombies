import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MainContainer } from './styled/Div';
import { Header } from './styled/Font';
import { Form } from './styled/Form';
import { Input, InputFeedback, Label } from './styled/Input';
import { Button } from './styled/Button';
import { Select, Option } from './styled/Select';
import { Pill, PillContainer } from './styled/Pill';

import { getActiveUser } from '../redux/activeUser/thunks';
import { getRepos } from '../redux/repository/thunks';
import { postConversation } from '../redux/conversations/thunks';

import nlp from 'compromise';
import whitelist from '../../whitelist';

import CustomQuill from './Quill';

//TODO: Handle Successful Post by Redirecting to the Post
class NewConversation extends Component {
  constructor() {
    super();
    this.state = {
      topic: '',
      body: '',
      errors: {
        topicError: '',
        bodyError: '',
      },
      tags: [],
    };
  }

  componentDidMount() {
    this.props.getActiveUser();
    setTimeout(() => {
      this.props.getRepos();
    }, 100);
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      this.validate(name, value);
      //todo: call generateTags from here
      this.generateTags(value);
    });
  };

  handleOnClick = e => {
    e.preventDefault();
    this.props.postConversation(this.props.authentication.activeUser);
  };

  handleCodeType = (e, codeType) => {
    e.preventDefault();
    this.setState({ codeType })
  }

  getCodeBlock = codeblock => {
    this.setState({ 
      codeblocks: [
        ...this.state.codeblocks,
        { type: this.state.codeType, codeblock }
      ]
    });
    this.setState({ codeType: null })
  }
  
  generateTags = (value) => {
    const { tags } = this.state;
    const newTags = tags;
    //run compromise on body content
    let postTopics = nlp(value).normalize({ plurals:true, parentheses:true }).nouns();
    //loop through returned terms   
    console.log(postTopics.out('freq'));
    postTopics.out('freq').forEach(term => {
      //if term is NOT already in the tags list and IS in the whitelist, add it
      if (!newTags.includes(term.reduced) && whitelist[term.reduced]) {
          newTags.push(term.reduced);
      }
    });
    if (newTags.length > tags.length) {
      this.setState({ tags: newTags })
    }
  }

  getBodyText = text => {
    this.setState({ body: text })
  }

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
    console.log(this.state.body)
    const {
      topic,
      body,
      tags,
      errors,
      errors: { topicError, bodyError },
    } = this.state;

    return (
      <MainContainer>
        <Form>
          <Header>Create a New Conversation</Header>
          <Label>Topic</Label>
          <Input
            type="text"
            name="topic"
            placeholder="Help running NPM Testem"
            value={topic}
            onChange={this.handleOnChange}
          />
          <InputFeedback>{topicError}</InputFeedback>
          {this.props.reposetories.length &&
          this.props.activeUser.githubUsername ? (
            <div>
              <label>Add repository link to your Conversation:</label>
              <Select
                id="repository"
                onChange={ev => {
                  this.setState({
                    body: ev.target.value,
                  });
                }}
              >
                {this.props.reposetories.map(repo => (
                  <Option key={repo.id} value={repo.html_url}>
                    {repo.name}
                  </Option>
                ))}
              </Select>
            </div>
          ) : null}
          <Label>Body</Label>
          <CustomQuill getBodyText={this.getBodyText}/>
          <InputFeedback>{bodyError}</InputFeedback>
          <PillContainer>
            {
              tags.length ?
              tags.map(tag => <Pill key={tag}>{tag}</Pill>)
              : ''
            }
          </PillContainer>
          <Button
            disabled={
              !topic || !body || Object.values(errors).some(val => !!val)
                ? true
                : false
            }
            onClick={this.handleOnClick}
          >
            Post New Conversation
          </Button>
        </Form>
      </MainContainer>
    );
  }
}

const mapState = ({ authentication, activeUser, reposetories }) => ({
  authentication,
  activeUser,
  reposetories,
});

const mapDispatch = dispatch => ({
  postConversation: (userId, payload) => dispatch(postConversation(userId, payload)),
  getActiveUser: () => dispatch(getActiveUser()),
  getRepos: () => dispatch(getRepos()),
});

export default connect(mapState, mapDispatch)(NewConversation);
