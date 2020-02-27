import { SET_ALL_USERS, SET_USER, ADD_USER } from './constants';

export const users = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.users;

    case ADD_USER:
      return [...state, action.user];

    default:
      return state;
  }
};

export const user = (state = {}, action) => {
  switch (action.type) {
    case SET_USER:
      return action.user;

    default:
      return state;
  }
};
