import { SIGN_IN, SIGN_OUT, SIGN_UP, LOG_IN_ERROR } from './constants';

export const signIn = data => {
  return {
    type: SIGN_IN,
    isLoggedIn: true,
    activeUser: data
  };
};

export const signUp = data => {
  return {
    type: SIGN_UP,
    isLoggedIn: true,
    activeUser: data
  };
};

export const signOut = () => {
  return {
    type: SIGN_OUT,
    isLoggedIn: false
  };
};

export const setLogInError = () => {
  return {
    type: LOG_IN_ERROR,
    logInError: true
  };
};

export const removeLogInError = () => {
  return {
    type: LOG_IN_ERROR,
    logInError: false
  };
};
