import axios from 'axios';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN_ERROR = 'LOG_IN_ERROR';

// action creators
const signIn = data => {
  return {
    type: SIGN_IN,
    isLoggedIn: true,
    activeUser: data,
  };
};
const signUp = data => {
  return {
    type: SIGN_UP,
    isLoggedIn: true,
    activeUser: data,
  };
};

const signOut = () => {
  return {
    type: SIGN_OUT,
    isLoggedIn: false,
  };
};

const setLogInError = () => {
  return {
    type: LOG_IN_ERROR,
    logInError: true,
  };
};

export const removeLogInError = () => {
  return {
    type: LOG_IN_ERROR,
    logInError: false,
  };
};
export const logInAttempt = logInInfo => {
  return async (dispatch, getState) => {
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
