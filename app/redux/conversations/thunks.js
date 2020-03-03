import axios from 'axios';

import { setCurrentConversation, setAllConversations } from './actions';

import { checkError, checkSuccess } from '../statusMessage/utils';

//--------
//CURRENT VIEW CONVERSATION THUNKS

//Fetch a single conversation by Id, set it as the current view
export const fetchCurrentConversation = conversationId => {
  return dispatch => {
    return axios
      .get(`/api/conversation/${conversationId}`)
      .then(res => dispatch(setCurrentConversation(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

//create a new conversation, and set it as the current view
export const createConversation = content => {
  return dispatch => {
    return axios
      .post(`/api/conversation`, content)
      .then(res => {
        dispatch(setCurrentConversation(res.data));
      })
      .catch(e => checkError(dispatch, e.response.status));
  };
};

//push updates to a conversation, and update the current view with the results
export const updateConversation = (conversationId, content) => {
  return dispatch => {
    return axios
      .put(`/api/conversation/${conversationId}`, content)
      .then(res => {
        dispatch(setCurrentConversation(res.data));
        checkSuccess(dispatch, res.status);
      })
      .catch(e => checkError(dispatch, e.response.status));
  };
};

//delete a conversation. Sets the current conversation to null(?)
//also triggers a fetch of All Conversations, to prevent the user from getting to deleted content
export const deleteConversation = conversationId => {
  return dispatch => {
    return axios
      .delete(`/api/conversation/${conversationId}`)
      .then(res => {
        dispatch(setCurrentConversation());
        checkError(dispatch, res.status);
      })
      .then(() => dispatch(fetchAllConversations()))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

//-------
//ALL CONVERSATIONS THUNKS

//sets all the conversations
export const fetchAllConversations = (page = 0) => {
  return dispatch => {
    console.log('psge', page);
    return axios
      .get(`/api/conversation?page=${page}`)
      .then(res => dispatch(setAllConversations(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

//sets the conversations list to a filtered subset
export const filterConversations = tag => {
  return dispatch => {
    return axios
      .get(`/api/tag/${tag}`)
      .then(res => dispatch(setAllConversations(res.data.conversations)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};

export const searchReplies = str => {
  const filtered = [];
  return (dispatch, getState) => {
    return axios
      .get(`/api/reply/search?search=${str}`)
      .then(res => res.data)
      .then(replies => {
        console.log(replies);
        replies.forEach(reply => filtered.push(reply.conversation));
        const tmpSet = new Set(filtered);
        const noDupes = [...tmpSet];
        dispatch(setAllConversations(noDupes));
      });
  };
};

//-------------
// export const getAllConversations = () => {
//   return dispatch => {
//     return axios
//       .get('/api/conversation')
//       .then(res => dispatch(setAllConversations(res.data)))
//       .catch(e => checkError(dispatch, e.response.status));
//   };
// };
