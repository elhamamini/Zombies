import { LOGIN, LOGOUT, SIGN_UP, LOGIN_ERROR } from './constants';

const initialState = {
  isLoggedIn: false,
  logInError: false,
};

export default (state = initialState, action) => {
  const isLoggedIn = action.isLoggedIn;
  const logInError = action.logInError;

  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        isLoggedIn,
      };
    }

    case LOGOUT: {
      return {
        ...state,
        isLoggedIn,
      };
    }

    case LOGIN_ERROR: {
      return {
        ...state,
        logInError,
      };
    }

    case SIGN_UP: {
      return {
        ...state,
        isLoggedIn,
      };
    }

    default:
      return state;
  }
};
