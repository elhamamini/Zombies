import React, { Component } from 'react';
import { connect } from 'react-redux';

import { login } from '../redux/authentication/thunks';
import { removeLogInError } from '../redux/authentication/actions';

import { Header, Anchor } from './styled/Font';
import { Hr } from './styled/Div';
import { Form, FormRow, FormColumn } from './styled/Form';
import { Input, InputFeedback } from './styled/Input';
import Button from './styled/Button';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {
        emailError: '',
        passwordError: ''
      }
    };
  }

  componentDidUpdate() {
    const {
      authentication: { isLoggedIn }
    } = this.props;
    //for now i just send it to the home page after login
    if (isLoggedIn) this.props.history.push('/');
  }

  handleOnClick = e => {
    const { email, password } = this.state;
    e.preventDefault();
    this.props.login({ email, password });
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validate(name, value));
  };

  validate = (name, value) => {
    const { errors } = this.state;
    //TODO: Validate on submit for values not in our database NOT onchange
    switch (name) {
      case 'email':
        const regex = /\S+@\S+\.\S+/;
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              emailError: 'Email cannot be blank'
            }
          });
        } else if (!regex.test(value)) {
          this.setState({
            errors: {
              ...errors,
              emailError: 'Email invalid'
            }
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              emailError: ''
            }
          });
        }
        break;

      case 'password':
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              passwordError: 'Password cannot be blank'
            }
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              passwordError: ''
            }
          });
        }
        break;
    }
  };

  render() {
    const {
      email,
      password,
      errors,
      errors: { emailError, passwordError }
    } = this.state;
    return (
      <Form>
        <Header>Sign in with Social Media</Header>
        <FormRow>
          <Button>
            <a href={'/api/github/login'}>Continue with Github </a>
          </Button>

          <Button secondary onClick={this.handleOnClick}>
            Continue with Google
          </Button>
        </FormRow>
        <Hr />
        <Header>Or sign in with your email and password</Header>
        <FormColumn>
          <Input
            type="text"
            placeholder="email"
            onChange={this.handleOnChange}
            name="email"
            value={email}
          />
          <InputFeedback>{emailError}</InputFeedback>
        </FormColumn>

        <FormColumn>
          <Input
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
            !email || !password || Object.values(errors).some(val => !!val)
              ? true
              : false
          }
          onClick={this.handleOnClick}
        >
          Login
        </Button>
        <Anchor href="#">Forgot Password?</Anchor>
      </Form>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

const mapDispatchToProps = dispatch => {
  return {
    login: info => dispatch(login(info)),
    removeLogInError: () => dispatch(removeLogInError())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
