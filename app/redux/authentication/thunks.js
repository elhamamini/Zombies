import axios from 'axios';

import { login, logout, signUp, setLoginError } from './actions';
import { setUser } from '../users/actions';

export const attemptLogin = credentials => {
  return dispatch => {
    axios
      .post('/auth/login', credentials)
      .then(res => {
        dispatch(login(res.data));
        dispatch(setUser(res.data))
      })
      .catch(e => {
        console.error(e);
        dispatch(setLoginError());
        dispatch(logout());
      });
  };
};

export const attemptSignUp = signUpInfo => {
  return async dispatch => {
    await axios
      .post('/auth/signup', signUpInfo)
      .then(res => {
        return dispatch(signUp(res.data));
      })
      .catch(e => {
        console.error(e);
        dispatch(setLogInError());
        return dispatch(signOut());
      });
  };
};

export const attemptLogout = () => {
  return dispatch => {
    axios
      .get('/auth/signout')
      .then(() => dispatch(logout()))
      .catch(e => {
        console.error(e);
        dispatch(signOut());
      });
  };
};
