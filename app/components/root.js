import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './LoginComponent';
import Nav from './Nav';

export default class Root extends Component {
  async componentDidMount() {}
  render() {
    return (
      <Router>
        <main>
          <Nav />
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
        </main>
      </Router>
    );
  }
}
