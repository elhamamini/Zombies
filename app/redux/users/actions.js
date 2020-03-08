import { SET_ALL_USERS, SET_USER } from './constants';

export const setUsers = users => {
  return {
    type: SET_ALL_USERS,
    users,
  };
};

export const setUser = (user = {}) => {
  return {
    type: SET_USER,
    user,
  };
};