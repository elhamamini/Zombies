import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { initialLogInAttempt } from '../redux/authentication/thunks';
import store from '../store';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import NewConversation from './NewConversation';
import Test from './test';
import UserProfile from './UserProfile';

export default class Root extends Component {
  async componentDidMount() {
    await store.dispatch(initialLogInAttempt());
  }
  render() {
    return (
      <Router>
        <main>
          <Nav />
          <Switch>
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home} />
            <Route path="/test" component={Test} exact />
            <Route path="/userprofile" component={UserProfile} exact />
          </Switch>
        </main>
      </Router>
    );
  }
}
