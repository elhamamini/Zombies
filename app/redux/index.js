import { combineReducers } from 'redux';
import authentication from './authentication/reducers';
import { users, user } from './users/reducers';
import { conversation, allConversations } from './conversations/reducers';
import { repositories } from './repository/reducers';

const appReducer = combineReducers({
  users,
  user,
  authentication,
  conversation,
  allConversations,
  repositories
});

export default appReducer;
