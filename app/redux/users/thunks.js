import axios from 'axios';

import { setUsers, setUser } from './actions';
import { checkError, checkSuccess } from '../statusMessage/utils';

export const fetchUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(res => dispatch(setUsers(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const getUserFromGitHub = () => {
  return dispatch => {
    return axios
      .get('/api/github/user')
      .then(res => dispatch(setUser(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const createUser = (user, token) => {
  return dispatch => {
    return axios
      .post('/api/users', user, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => dispatch(setUser(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const removeUser = (id, token) => {
  return dispatch => {
    return axios
      .delete(`/api/users${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        checkSuccess(dispatch, res.status);
        dispatch(fetchUsers(res.data));
      })
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const updateUser = (id, user, token) => {
  return dispatch => {
    return axios
      .put(`/api/users/${id}`, user, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => {
        checkSuccess(dispatch, res.status);
        dispatch(setUser(res.data));
      })
      .catch(e => checkError(dispatch, e.res.status));
  };
};
