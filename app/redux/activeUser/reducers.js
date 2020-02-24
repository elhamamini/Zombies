import axios from 'axios';
import { SIGN_IN, SIGN_OUT, SIGN_UP } from '../authentication/constants';
import { SET_ACTIVE_USER } from './constants';

export const activeUserReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_ACTIVE_USER:
      return action.user;
    case SIGN_IN:
      return action.activeUser;
    case SIGN_UP:
      return action.activeUser;
    case SIGN_OUT:
      return {};

    default:
      return state;
  }
};
