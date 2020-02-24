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

export default class Root extends Component {
  render() {
    return (
      <Router>
        <main>
          <Nav />
          <Switch>
<<<<<<< HEAD
            <Route path="/login" component={Login} />
            <Route exact path="/" component={Home} />
=======
            <Route path='/login' component={Login} />
            <Route path='/ml' component={MLForm} />
            <Route exact path='/' component={Home} />
>>>>>>> dev
          </Switch>
        </main>
      </Router>
    );
  }
}
