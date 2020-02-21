import { combineReducers } from 'redux';
import authenticationReducer from './authentication/reducers';
import usersReducer from './users/reducers';

const appReducer = combineReducers({
  users: usersReducer,
  authentication: authenticationReducer,
});

export default appReducer;
