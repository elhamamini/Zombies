import axios from 'axios';

import { signIn, signUp, signOut, setLogInError } from './actions';


export const login = logInInfo => {
    return async dispatch => {
      await axios
        .post('/auth/login', logInInfo)
        .then(res => {
          return dispatch(signIn(res.data));
        })
        .catch(e => {
          console.error(e);
          dispatch(setLogInError());
          return dispatch(signOut());
        });
    };
  };

  export const SignUpAttempt = signUpInfo => {
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

  export const logOutAttempt = () => {
    return dispatch => {
      axios
        .get('/auth/signout')
        .then(() => {
          dispatch(signOut());
        })
        .catch(e => {
          console.error(e);
          return dispatch(signOut());
        });
    };
  };

  export const initialLogInAttempt = () => {
    return dispatch => {
      axios
        .get('/auth/me')
        .then(async res => {
          const user = res.data;
          dispatch(signIn(user));
        })
        .catch(e => {
          console.error(e);
        });
    };
  };