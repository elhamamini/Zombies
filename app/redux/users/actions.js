import { SET_ALL_USERS, ADD_USER } from './constants';

export const setUsers = users => {
    return {
      type: SET_ALL_USERS,
      users,
    };
  };

export const addUser = user => {
  return {
    type: ADD_USER,
    user,
  };
};