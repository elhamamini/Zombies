import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Nav from './Nav';
import CodeEditor from './codeEditor/CodeEditor';

console.log(CodeEditor)

export default class Root extends Component {
  async componentDidMount() {}
  render() {
    return (
      <Router>
        <main>
          <Nav />
          <Switch>
            <Route path='/login' component={Login} />
            <Route exact path='/' component={Home} />
            <Route path='/codeeditor' component={CodeEditor} />
          </Switch>
        </main>
      </Router>
    );
  }
}
