import { combineReducers } from 'redux';
import authentication from './authentication/reducers';
import { users, user } from './users/reducers';
import { conversation, allConversations } from './conversations/reducers';
import { repositories } from './repository/reducers';
import statusMessage from './statusMessage/reducers';
import { tags } from './tags/reducers';

const appReducer = combineReducers({
  users,
  user,
  authentication,
  conversation,
  allConversations,
  repositories,
  statusMessage,
  tags,
});

export default appReducer;
