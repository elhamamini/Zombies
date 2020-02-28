import axios from 'axios';

import { signIn, signUp, signOut, setLogInError } from './actions';

export const login = logInInfo => {
  return async dispatch => {
    await axios
      .post('/auth/login', logInInfo)
      .then(res => {
        dispatch(signIn(res.data));
      })
      .catch(e => {
        dispatch(signOut());
        checkError(dispatch, e.response.status);
      });
  };
};

export const SignUpAttempt = signUpInfo => {
  return async dispatch => {
    await axios
      .post('/auth/signup', signUpInfo)
      .then(res => {
        dispatch(signUp(res.data));
      })
      .catch(e => {
        dispatch(signOut());
        checkError(dispatch, e.response.status);
      });
  };
};

export const logOutAttempt = () => {
  return dispatch => {
    axios
      .get('/auth/signout')
      .then(() => dispatch(signOut()))
      .catch(e => {
        dispatch(signOut());
        checkError(dispatch, e.response.status)
      });
  };
};

export const initialLogInAttempt = () => {
  return dispatch => {
    axios
      .get('/auth/me')
      .then(async res => {
        const user = res.data;
        console.log('user', user);
        dispatch(signIn(user));
      })
      .catch(e => {
        console.error(e);
      });
  };
};
