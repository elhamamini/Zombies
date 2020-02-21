import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Login from './login';

export default class Root extends Component {
  async componentDidMount() {}
  render() {
    return (
      <Router>
        <main>
          <Switch>
            <Route path="/login" component={Login} />
          </Switch>
        </main>
      </Router>
    );
  }
}
