import { combineReducers } from 'redux';
import authenticationReducer from './authentication';
import usersReducer from './users';
const appReducer = combineReducers({
  users: usersReducer,

  authentication: authenticationReducer,
});

export default appReducer;
