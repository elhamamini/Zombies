import { SIGN_IN, SIGN_OUT, SIGN_UP, LOG_IN_ERROR } from './constants';

const initialState = {
  isLoggedIn: false,
  logInError: false,
};

const authenticationReducer = (state = initialState, action) => {
  const isLoggedIn = action.isLoggedIn;
  const logInError = action.logInError;

  switch (action.type) {
    case SIGN_IN: {
      return {
        ...state,
        isLoggedIn,
      };
    }

    case SIGN_UP: {
      return {
        ...state,
        isLoggedIn,
      };
    }

    case SIGN_OUT: {
      return {
        ...state,
        isLoggedIn,
      };
    }

    case LOG_IN_ERROR: {
      return {
        ...state,
        logInError,
      };
    }
    
    default:
      return state;
  }
};

export default authenticationReducer;
