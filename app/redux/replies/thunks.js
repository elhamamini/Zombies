import axios from 'axios';

import { setAllReplies } from './actions';
import { fetchCurrentConversation } from '../conversations/thunks';
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
      .then(() => dispatch(fetchCurrentConversation(content.conversationId)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const updateReply = (reply, id) => {
  return dispatch => {
    return axios
      .put(`/api/reply/${id}`, reply)
      .then(() => dispatch(fetchAllReplies()))
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
