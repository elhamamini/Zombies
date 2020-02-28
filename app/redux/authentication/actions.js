import { LOGIN, LOGOUT, SIGN_UP, LOGIN_ERROR } from './constants';

export const login = data => {
  return {
    type: LOGIN,
    isLoggedIn: true,
    activeUser: data,
  };
};

export const logout = () => {
  return {
    type: LOGOUT,
    isLoggedIn: false,
  };
};

export const setLoginError = () => {
  return {
    type: LOGIN_ERROR,
    logInError: true,
  };
};

export const removeLogInError = () => {
  return {
    type: LOGIN_ERROR,
    logInError: false,
  };
};

export const signUp = () => {
  return {
    type: SIGN_UP,
    isLoggedIn: true,
    // activeUser: data,
  };
};
