import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MainContainer } from './styled/Div';
import { Header } from './styled/Font'
import { Form } from './styled/Form';
import { Input, TextField, InputFeedback, Label } from './styled/Input';
import Button from './styled/Button';

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
      }
    }
  }

  handleOnChange = ({ target: { name, value }}) => {
    this.setState({ [name]: value }, () => this.validate(name, value))
  }

  handleOnClick = e => {
    e.preventDefault();
    this.props.postConversation(this.props.authentication.activeUser)
  }

  validate = (name, value) => {
    const { errors } = this.state
    switch(name) {
      case 'topic':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              topicError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              topicError: ''
            }
          })
        }
        break;

      case 'body':
        if(!value) {
          this.setState({
            errors: {
              ...errors,
              bodyError: 'Required field'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              bodyError: ''
            }
          })
        }
        break;
    }
  }

  render() {
    const {
      topic,
      body,
      errors,
      errors: {
        topicError,
        bodyError
      } 
    } = this.state;

    return (
      <MainContainer>
    <Form>
      <Header>Create a New Conversation</Header>
      <Label>Topic</Label>
      <Input 
        type='text'
        name='topic'
        placeholder='Help running NPM Testem'
        value={topic}
        onChange={this.handleOnChange}
      />
      <InputFeedback>{ topicError }</InputFeedback>
      <Label>Body</Label>
      <TextField 
        rows='12'
        type='text'
        name='body'
        value={body}
        onChange={this.handleOnChange}
      />
      <InputFeedback>{ bodyError }</InputFeedback>
      <Button
        disabled={
          !topic || !body || Object.values(errors).some(val => !!val)
            ? true
            : false
        }
        onClick={this.handleOnClick}>Post New Conversation</Button>
    </Form>
    </MainContainer>
    );
  }
}

const mapState = ({ authentication }) => ({ authentication });

const mapDispatch = dispatch => ({ postConversation: userId => dispatch(postConversation()) })

export default connect(mapState, mapDispatch)(NewConversation);