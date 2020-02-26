import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { initialLogInAttempt } from '../redux/authentication/thunks';
import store from '../store';
import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import MLForm from './MLForm';
import NewConversation from './NewConversation';
import Test from './test';
import UserProfile from './UserProfile';
import PostPage from './PostPage';

export default class Root extends Component {
  render() {
    return (
      <Router>
        <main>
          <Nav />
          <Switch>
            <Route path="/test" component={Test} exact />
            <Route path="/userprofile" component={UserProfile} exact />

            <Route path="/login" component={Login} />
            <Route path="/ml" component={MLForm} />
            <Route exact path="/" component={Home} />
            <Route path="/postpage" component={PostPage} />
          </Switch>
        </main>
      </Router>
    );
  }
}
