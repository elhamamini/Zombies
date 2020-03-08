import { combineReducers } from 'redux';
import { users, user } from './users/reducers';
import { conversation, allConversations } from './conversations/reducers';
import { repositories } from './repository/reducers';
import statusMessage from './statusMessage/reducers';
import { tags } from './tags/reducers';
import replies from './replies/reducers';
import body from './body/reducers';

const appReducer = combineReducers({
  users,
  user,
  conversation,
  replies,
  allConversations,
  repositories,
  statusMessage,
  tags,
  body,
});

export default appReducer;
