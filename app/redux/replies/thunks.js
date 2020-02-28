import axios from 'axios';
import {
  createReply,
  editReply,
  setAllReplies,
  setReply,
  deleteReply,
} from './actions';

export const newReply = reply => {
  return dispatch => {
    return axios
      .post('/api/reply', reply)
      .then(res => dispatch(createReply(res.data)))
      .catch(e => console.log('error in reply think:', e.message));
  };
};
export const editReply = (reply, id) => {
  return dispatch => {
    return axios
      .put(`/api/reply/${id}`, reply)
      .then(res => dispatch(editReply(res.data)))
      .catch(e => console.log('error in reply thunk:', e.message));
  };
};
export const getReply = id => {
  return dispatch => {
    return axios
      .get(`/api/reply/${id}`)
      .then(res => dispatch(setReply(res.data)))
      .catch(e => console.log('Error in thunk:', e.message));
  };
};
export const getAllReplies = () => {
  return dispatch => {
    return axios
      .get('/api/reply')
      .then(res => dispatch(setAllReplies(res.data)))
      .catch(e => console.log('error in thunk:', e.message));
  };
};
export const deleteReply = id => {
  return dispatch => {
    return axios
      .delete(`/api/reply/${id}`)
      .then(res => dispatch(removeReply(id)))
      .catch(e => console.log('error in reply :', e.message));
  };
};
