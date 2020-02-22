import axios from 'axios';

import {
    createConversation,
    setConversation,
    setAllConversations,
    removeConversation
} from './actions';

//TODO: Add better error handling - custom component with user-readable error message
export const postConversation = userId => {
    return () => {
        return axios
            .post(`/api/conversation`, userId)
            .then(res => dispatch(updateConversation(res.data)))
            .catch(e => console.log(e));
    };
};

export const updateConversation = (conversationId, conversation) => {
    return dispatch => {
        return axios
            .put(`/api/conversation/${conversationId}`, conversation)
            .then(res => dispatch(createConversation(res.data)))
            .catch(e => console.error(e));
    };
};

export const fetchConversation = conversationId => {
    return dispatch => {
        return axios
            .get(`/api/conversation/${conversationId}`)
            .then(res => dispatch(setConversation(res.data)))
            .catch(e => console.error(e));
    };
};

export const fetchAllConversations = () => {
    return dispatch => {
        return axios
            .get(`/api/conversation`)
            .then(res => dispatch(setAllConversations(res.data)))
            .catch(e => console.error(e));
    };
};

export const deleteConversation = conversationId => {
    return dispatch => {
        return axios
            .delete(`/api/conversation/${conversationId}`)
            .then(() => dispatch(removeConversation(conversationId)))
            .catch(e => console.error(e));
    };
};