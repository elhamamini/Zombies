import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import MLForm from './MLForm';
import AllConvos from './ConversationsIndex/AllConvos';
import NewConversation from './NewConversation';
import Test from './test';
import UserProfile from './UserProfile';
import PostPage from './PostPage';

import { getUserFromGitHub } from '../redux/users/thunks';

class Root extends Component {
  componentDidMount() {
    this.props.getUserFromGitHub();
  }

  render() {
    return (
      <Router>
        <main>
          <NavBar />
          <Switch>
            <Route path="/userprofile" component={UserProfile} exact />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={AllConvos} />
            <Route path="/new" component={NewConversation} />
            <Route path="/postpage" component={PostPage} />
          </Switch>
        </main>
      </Router>
    );
  }
}

const mapDispatch = dispatch => ({
  getUserFromGitHub: () => dispatch(getUserFromGitHub()),
});

export default connect(null, mapDispatch)(Root);
