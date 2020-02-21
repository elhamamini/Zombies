import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { logInAttempt, removeLogInError } from '../redux/authentication';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      emailHelper: '',
      emailErr: false,
      passHelper: '',
      passErr: false,
    };
  }

  componentDidUpdate() {
    const {
      authentication: { isLoggedIn },
    } = this.props;
    //for now i just send it to the home page after login
    if (isLoggedIn) this.props.history.push('/');
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    });

    if (name === 'email') {
      if (value.length > 0 && this.validateEmail(value)) {
        this.setState({ emailHelper: '', emailErr: false });
      } else if (value.length === 0) {
        this.setState({ emailHelper: 'Email cannot be empty', emailErr: true });
      }
    }

    if (name === 'password') {
      if (value.length > 0) {
        this.setState({ passHelper: '', passHelper: false });
      } else {
        this.setState({
          passHelper: 'Password cannot be empty',
          passErr: true,
        });
      }
    }

    const {
      authentication: { logInError },
    } = this.props;
    if (logInError) {
      this.props.removeLogInError();
    }
  };

  validateEmail = email => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  onSubmit = ev => {
    ev.preventDefault();
    const { email, password } = this.state;
    if (this.validateEmail(email) === false) {
      this.setState({ emailHelper: 'Email must be valid', emailErr: true });
      return;
    } else {
      this.props.login({ email, password });
    }
  };

  logInError = () => {
    const {
      authentication: { logInError },
    } = this.props;
    if (logInError) {
      return <h4>Your email or password is incorrect</h4>;
    } else return null;
  };
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '3rem',
        }}
      >
        <form
          style={{
            width: '35%',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            border: 'solid 1px black',
            padding: '3rem',
          }}
        >
          <input
            type="text"
            name="email"
            onChange={ev => this.handleChange(ev)}
          />
          <input
            type="password"
            name="password"
            onChange={ev => this.handleChange(ev)}
          />
          <button onClick={ev => this.onSubmit(ev)}>sign in</button>
          <div>{this.logInError()}</div>
        </form>
      </div>
    );
  }
}
const mapStateToProps = ({ authentication }) => ({ authentication });

const mapDispatchToProps = dispatch => {
  return {
    login: info => dispatch(logInAttempt(info)),
    removeLogInError: () => dispatch(removeLogInError()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
