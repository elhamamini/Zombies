import axios from 'axios';
import { SIGN_IN, SIGN_OUT } from '../authentication/constants';
import { SET_ACTIVE_USER } from './constants';

export const activeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return action.user;
    case SIGN_IN:
      return action.activeUser;

    default:
      return state;
  }
};
