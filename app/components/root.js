import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { initialLogInAttempt } from '../redux/authentication/thunks';
import store from '../store';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import CodeEditor from './codeEditor/CodeEditor';

console.log(CodeEditor)

export default class Root extends Component {
  render() {
    return (
      <Router>
        <main>
          <Nav />
          <Switch>
            <Route path='/login' component={Login} />
            <Route path='/ml' component={MLForm} />
            <Route exact path='/' component={Home} />
          </Switch>
        </main>
      </Router>
    );
  }
}
