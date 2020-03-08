import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as Font from './styled/Font';
import { Container, FormColumn } from './styled/Form';
import { TextInput, InputFeedback } from './styled/Input';
import { Button } from './styled/Button';

import { createUser } from '../redux/users/thunks';

class SignUp extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      name: '',
      email: '',
      password: '',
      errors: {
        nameError: '',
        emailError: '',
        passwordError: '',
      },
    };
  }

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validate(name, value));
  };

  handleOnClick = e => {
    const { name, email, password } = this.state;
    e.preventDefault();
    this.setState({ isLoading: true })
    this.props.createUser({
      name,
      email,
      password,
      userType: 'user',
      loggedIn: true,
    });
    this.setState({ isLoading: false })
    this.props.history.push('/');
  };
  validate = (name, value) => {
    const { errors } = this.state;
    switch (name) {
      case 'name':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              nameError: 'Username cannot be blank',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              nameError: '',
            },
          });
        }
        break;

      case 'email':
        const emailRegex = /\S+@\S+\.\S+/;
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              emailError: 'Email cannot be blank',
            },
          });
        } else if (!emailRegex.test(value)) {
          this.setState({
            errors: {
              ...errors,
              emailError: 'Email invalid',
            },
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              emailError: '',
            },
          });
        }
        break;

      case 'password':
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,}$/
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              passwordError: 'Password cannot be blank',
            },
          });
        } else if(!passwordRegex.test(value)) {
          this.setState({
            errors: {
              ...errors,
              passwordError: 'Password  invalid'
            }
          })
        } else {
          this.setState({
            errors: {
              ...errors,
              passwordError: '',
            },
          });
        }
        break;
    }
  };

  render() {
    const {
      isLoading,
      name,
      email,
      password,
      errors,
      errors: { emailError, passwordError, nameError },
    } = this.state;

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
      >
      <img src="https://zombieforums.nyc3.cdn.digitaloceanspaces.com/header-2.png" width="350" height="205" />
      <Container>
        <Font.Header>Join Zombies</Font.Header>
        <FormColumn>
          <TextInput
            type="text"
            placeholder="Username"
            onChange={this.handleOnChange}
            name="name"
            value={name}
          />
          <InputFeedback>{nameError}</InputFeedback>
        </FormColumn>
        <FormColumn>
          <TextInput
            type="text"
            placeholder="email"
            onChange={this.handleOnChange}
            name="email"
            value={email}
          />
          <InputFeedback>{emailError}</InputFeedback>
        </FormColumn>

        <FormColumn>
          <TextInput
            type="password"
            placeholder="password"
            onChange={this.handleOnChange}
            name="password"
            value={password}
          />
          <InputFeedback>{passwordError}</InputFeedback>
        </FormColumn>

        <Button
          disabled={
            isLoading ||
            !name ||
            !email ||
            !password ||
            Object.values(errors).some(val => !!val)
              ? true
              : false
          }
          onClick={this.handleOnClick}
        >
          Signup
        </Button>
        <Font.Anchor href="/login">Do you have an account? Log in</Font.Anchor>
      </Container>
      </div>
    );
  }
}

const mapDispatch = dispatch => ({ createUser: user => dispatch(createUser(user)) });

export default connect(null, mapDispatch)(SignUp);
