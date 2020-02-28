import axios from 'axios';

import { login, logout, signUp } from './actions';
import { setUser } from '../users/actions';
import { checkError } from '../statusMessage/utils';

export const attemptLogin = credentials => {
  return dispatch => {
    axios
      .post('/auth/login', credentials)
      .then(res => {
        dispatch(login(res.data));
        dispatch(setUser(res.data));
      })
      .catch(e => {
        dispatch(logout());
        checkError(dispatch, e.response.status);
      })
  };
};

export const attemptSignUp = credentials => {
  return dispatch => {
    axios
      .post('/auth/signup', credentials)
      .then(res => dispatch(signUp(res.data)))
      .catch(e => {
        dispatch(logout());
        checkError(dispatch, e.response.status);
      });
  };
};

export const attemptLogout = () => {
  return dispatch => {
    axios
      .get('/auth/logout')
      .then(() => dispatch(logout()))
      .catch(e => {
        dispatch(logout());
        checkError(dispatch, e.response.status)
      });
  };
};