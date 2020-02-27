import { combineReducers } from 'redux';
import authenticationReducer from './authentication/reducers';
import { users, user } from './users/reducers';
import { conversation, allConversations } from './conversations/reducers';
import { reposetoriesReducer } from './repository/reducers';

const appReducer = combineReducers({
  users,
  user,
  authentication: authenticationReducer,
  conversation,
  allConversations,
  reposetories: reposetoriesReducer,
});

export default appReducer;
