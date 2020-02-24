import { combineReducers } from 'redux';
import authenticationReducer from './authentication/reducers';
import usersReducer from './users/reducers';
import { conversation } from './conversations/reducers';
import { reposetoriesReducer } from './repository/reducers';
import { activeUserReducer } from './activeUser/reducers';

const appReducer = combineReducers({
  users: usersReducer,
  authentication: authenticationReducer,
  conversation,
  reposetories: reposetoriesReducer,
  activeUser: activeUserReducer,
});

export default appReducer;
