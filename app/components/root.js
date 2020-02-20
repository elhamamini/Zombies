import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Test } from './test';

export default class Root extends Component {
  async componentDidMount() {}
  render() {
    return (
      <Router>
        <main>
          <Switch>
            <Route path="/" component={Test} />
          </Switch>
        </main>
      </Router>
    );
  }
}
