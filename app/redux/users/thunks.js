import axios from 'axios';

import { setUsers, setUser, addUser, editUser } from './actions';
import { checkError, checkSuccess } from '../statusMessage/utils';

export const fetchUsers = () => {
  return dispatch => {
    return axios
      .get('/api/users')
      .then(response => dispatch(setUsers(response.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const getUserFromGitHub = () => {
  return dispatch => {
    return axios
      .get('/api/github/user')
      .then(res => dispatch(setUser(res.data)))
      .catch(e => console.log(e));
  };
};

export const createUser = user => {
  console.log(user)
  return dispatch => {
    return axios
      .post('/api/users', user)
      .then(res => dispatch(addUser(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const removeUser = id => {
  return dispatch => {
    return axios
      .delete(`/api/users${id}`)
      .then(res => {
        checkSuccess(dispatch, res.status);
        dispatch(fetchUsers(res.data));
      })
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const updateUser = (userId, user) => {
  return dispatch => {
    return axios
      .put(`/api/users/${userId}`, user)
      .then(res => {
        console.log('edieteduser', res.data);
        // checkSuccess(dispatch, res.status);
        return dispatch(editUser(res.data));
      })
      .catch(e => checkError(dispatch, e.res.status));
  };
};
