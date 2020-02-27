import axios from 'axios';

import { setUsers, addUser, setUser } from './actions';

export const fetchUsers = () => {
    return dispatch => {
      return axios
        .get('/api/users')
        .then(response => dispatch(setUsers(response.data)))
        .catch(e => console.log('Error in thunk:', e));
    };
  };

export const getUserFromGitHub = () => {
  return dispatch => {
    return axios
      .get('/api/github/user')
      .then(res => dispatch(setUser(res.data)))
      .catch(e => console.error(e))
  }
};
  
  export const createUser = user => {
    return dispatch => {
      return axios
        .post('/api/users', user)
        .then(response => {
          console.log('create user thunk response data: ', response.data);
          dispatch(addUser(response.data));
        })
        .catch(e => console.log('Error in thunk:', e));
    };
  };

  export const removeUser = id => {
    return dispatch => {
      return axios
        .delete(`/api/users${id}`)
        .then(response => {
          console.log(response);
          return axios
            .get('/api/users')
            .then(responses => dispatch(fetchUsers(responses.data)));
        })
        .catch(e => console.log('Error in thunk:', e.message));
    };
  };
  
  export const updateUser = (userId, user) => {
    return dispatch => {
      return axios
        .put(`/api/users/${userId}`, user)
        .then(response => {
          console.log(response);
          return axios
            .get('/api/users/')
            .then(response => dispatch(fetchUsers(response.data)));
        })
        .catch(e => console.log('Error in thunk:', e.message));
    };
  };
  
