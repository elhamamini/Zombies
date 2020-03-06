import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import NavBar from './NavBar';
import MLForm from './MLForm';
import AllConvos from './ConversationsIndex/AllConvos';
import UserProfile from './UserProfile';
import PostPage from './PostPage';
import SignUp from './SignUp';
import MessageConsole from './MessageConsole';
import EditUser from './EditUser';
import NewConversation from './ConversationComponents/NewConversation';
import ConversationThread from './ConversationComponents/ConversationThread';
import LastTitleList from './LatestTitleList';
import FlaggedReplies from './FlaggedRepliesView';

import { getUserFromGitHub } from '../redux/users/thunks';
import { fetchTags } from '../redux/tags/thunks';
import { fetchRepos } from '../redux/repository/thunks';
import NotFound from './404Page';

class Root extends Component {
  componentDidMount() {
    this.props
      .getUserFromGitHub()
      .then(() => this.props.fetchRepos(this.props.user.githubUsername));

    this.props.fetchTags();
  }

  render() {
    return (
      <Router>
        <main>
          <NavBar />
          <MessageConsole />
          <Switch>
            <Route path="/userprofile" component={UserProfile} exact />
            <Route path="/login" component={Login} />
            <Route exact path="/" component={AllConvos} />
            <Route path="/postpage" component={PostPage} />
            <Route path="/signup" component={SignUp} exact />
            <Route path="/edituser" component={EditUser} />
            <Route path="/new" component={NewConversation} />
            {/* <Route path='/conversations' /> */}
            <Route path="/conversations/:id" component={ConversationThread} />
            <Route path="/last" component={LastTitleList} exact />
            <Route path="/flagged" component={FlaggedReplies} exact />
            <Route component={NotFound} />
          </Switch>
        </main>
      </Router>
    );
  }
}

const mapState = ({ user }) => ({ user });

const mapDispatch = dispatch => ({
  getUserFromGitHub: () => dispatch(getUserFromGitHub()),
  fetchTags: () => dispatch(fetchTags()),
  fetchRepos: () => dispatch(fetchRepos()),
});

export default connect(mapState, mapDispatch)(Root);
