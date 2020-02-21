import { combineReducers } from 'redux';
import authenticationReducer from './authentication';
import usersReducer from './users';
const appReduer = combineReducers({
  authentication: authenticationReducer,
  users: usersReducer,
});

export default appReduer;
