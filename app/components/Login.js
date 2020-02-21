import React, { Component } from "react";

import { Header, Anchor } from './styled/Font';
import { Hr } from "./styled/Div";
import { Form, FormRow, FormColumn } from "./styled/Form";
import { Input, InputFeedback } from "./styled/Input";
import Button from "./styled/Button";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errors: {
        usernameError: "",
        passwordError: ""
      }
    };
  }

  handleOnClick = e => {
    e.preventDefault();
    //TODO: LOGIN USER/DISPATCH TO REDUX STORE
  };

  handleOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validate(name, value));
  };

  validate = (name, value) => {
    const { errors } = this.state;
    //TODO: Validate on submit for values not in our database NOT onchange
    switch (name) {
      case "username":
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              usernameError: "Username cannot be blank"
            }
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              usernameError: ""
            }
          });
        }
        break;

      case "password":
        if (!value) {
          this.setState({
            errors: {
              ...errors,
              passwordError: "Password cannot be blank"
            }
          });
        } else {
          this.setState({
            errors: {
              ...errors,
              passwordError: ""
            }
          });
        }
        break;
    }
  };

  render() {
    const {
      username,
      password,
      errors: { usernameError, passwordError }
    } = this.state;
    return (
      <Form>
        <Header>Sign in with Social Media</Header>
        <FormRow>
          <Button secondary onClick={this.handleOnClick}>
            Continue with Github
          </Button>
          <Button secondary onClick={this.handleOnClick}>
            Continue with Google
          </Button>
        </FormRow>
        <Hr />
        <Header>Or sign in with your username and password</Header>
        <FormColumn>
          <Input
            type="text"
            placeholder="username"
            onChange={this.handleOnChange}
            name="username"
            value={username}
          />
          <InputFeedback>{usernameError}</InputFeedback>
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

        <Button onClick={this.handleOnClick}>Login</Button>
        <Anchor href='#'>Forgot Password?</Anchor>
      </Form>
    );
  }
}

export default Login;
