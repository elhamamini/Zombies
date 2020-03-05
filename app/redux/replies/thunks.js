import axios from 'axios';

import { addReply, editReply, setAllReplies, removeReply } from './actions';
import { checkError, checkSuccess } from '../statusMessage/utils';
export const fetchAllReplies = () => {
  return dispatch => {
    return axios
      .get('/api/reply')
      .then(res => dispatch(setAllReplies(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const createReply = content => {
  return dispatch => {
    return axios
      .post('/api/reply', content)
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const updateReply = (reply, id) => {
  console.log('replyyyy', reply);
  return dispatch => {
    return axios
      .put(`/api/reply/${id}`, reply)
      .then(res => {
        dispatch(fetchAllReplies());
      })
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const fetchReply = id => {
  return dispatch => {
    return axios
      .get(`/api/reply/${id}`)
      .then(res => dispatch(setReply(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const deleteReply = id => {
  return dispatch => {
    return axios
      .delete(`/api/reply/${id}`)
      .then(res => {
        dispatch(fetchAllReplies());
        checkSuccess(dispatch, res.status);
      })
      .catch(e => checkError(dispatch, e.response.status));
  };
};
