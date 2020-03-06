import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeLoginError } from '../redux/authentication/actions';
import { attemptSignUp } from '../redux/authentication/thunks';
import { Header, Anchor } from './styled/Font';
import { createUser } from '../redux/users/thunks';
import { Container, FormColumn } from './styled/Form';
import { TextInput, InputFeedback } from './styled/Input';
import { Button } from './styled/Button';
class SignUP extends Component {
  constructor() {
    super();
    this.state = {
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
  componentDidUpdate() {
    const {
      authentication: { isLoggedIn },
    } = this.props;
    //for now i just send it to the home page after login
    if (isLoggedIn) this.props.history.push('/');
  }
  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validate(name, value));
  };

  handleOnClick = e => {
    const { name, email, password } = this.state;
    e.preventDefault();
    this.props.signUp();
    this.props.createUser({ name, email, password, userType: 'user' });
    // this.props.history.push('/');
  };
  validate = (name, value) => {
    const { errors } = this.state;
    //TODO: Validate on submit for values not in our database NOT onchange
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
        const regex = /\S+@\S+\.\S+/;
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              emailError: 'Email cannot be blank',
            },
          });
        } else if (!regex.test(value)) {
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
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              passwordError: 'Password cannot be blank',
            },
          });
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
      name,
      email,
      password,
      errors,
      errors: { emailError, passwordError, nameError },
    } = this.state;

    return (
      <Container>
        <Header>Join Zombies</Header>
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
        <Anchor href="/login">Do you have an account? Log in</Anchor>
      </Container>
    );
  }
}
const mapStateToProps = ({ authentication }) => ({
  authentication,
});
const mapDispatchToProps = dispatch => {
  return {
    removeLoginError: () => dispatch(removeLoginError()),
    signUp: () => dispatch(attemptSignUp()),
    createUser: user => dispatch(createUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUP);
