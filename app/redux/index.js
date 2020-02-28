import { combineReducers } from 'redux';
import authenticationReducer from './authentication/reducers';
import { users, user } from './users/reducers';
import { conversation, allConversations } from './conversations/reducers';
import { repositories } from './repository/reducers';
import statusMessage from './statusMessage/reducers';

const appReducer = combineReducers({
  users,
  user,
  authentication: authenticationReducer,
  conversation,
  allConversations,
  repositories,
  statusMessage,
});

export default appReducer;
