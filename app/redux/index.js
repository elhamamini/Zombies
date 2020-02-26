import { combineReducers } from 'redux';
import authenticationReducer from './authentication/reducers';
import usersReducer from './users/reducers';
import { conversation, allConversations } from './conversations/reducers';
import { reposetoriesReducer } from './repository/reducers';
import { activeUserReducer } from './activeUser/reducers';

const appReducer = combineReducers({
  users: usersReducer,
  authentication: authenticationReducer,
  conversation,
  allConversations,
  reposetories: reposetoriesReducer,
  activeUser: activeUserReducer,
});

export default appReducer;
