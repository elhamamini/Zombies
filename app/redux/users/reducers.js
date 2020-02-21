import { SET_ALL_USERS, ADD_USER } from './constants';

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_USERS:
      return action.users;

    case ADD_USER:
      return [...state, action.user];

    default:
      return state;
  }
};

export default usersReducer;
