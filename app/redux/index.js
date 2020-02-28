import { combineReducers } from 'redux';
import authentication from './authentication/reducers';
import { users, user } from './users/reducers';
import { conversation, allConversations } from './conversations/reducers';
import { repositories } from './repository/reducers';
import { tags } from './tags/reducers';

const appReducer = combineReducers({
  users,
  user,
  authentication,
  conversation,
  allConversations,
  repositories,
  tags
});

export default appReducer;
