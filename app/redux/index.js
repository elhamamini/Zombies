import { combineReducers } from 'redux';
import authenticationReducer from './authentication/reducers';
import usersReducer from './users/reducers';
import { conversation } from './conversations/reducers';

const appReducer = combineReducers({
  users: usersReducer,
  authentication: authenticationReducer,
  conversation
});

export default appReducer;
