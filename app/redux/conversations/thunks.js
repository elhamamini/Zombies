import axios from 'axios';

import {
    createConversation,
    setConversation,
    setAllConversations,
    removeConversation
} from './actions';

import { checkError, checkSuccess } from '../statusMessage/utils';

//TODO: Add better error handling - custom component with user-readable error message
export const postConversation = author => {
    return dispatch => {
        return axios
            .post(`/api/conversation`, { author })
            .then(res => dispatch(updateConversation(res.data)))
            .catch(e => checkError(dispatch, e.response.status));
    };
};

export const updateConversation = (conversationId, conversation) => {
    return dispatch => {
        return axios
            .put(`/api/conversation/${conversationId}`, conversation)
            .then(res => {
                dispatch(createConversation(res.data))
                checkSuccess(res.status)
            })
            .catch(e => checkError(dispatch, e.response.status));
    };
};

//--------

export const fetchConversation = conversationId => {
    return dispatch => {
        return axios
            .get(`/api/conversation/${conversationId}`)
            .then(res => dispatch(setConversation(res.data)))
            .catch(e => checkError(dispatch, e.response.status));
    };
};

export const fetchAllConversations = (page=0) => {
    return dispatch => {
        return axios
            .get(`/api/conversation?page=${page}`)
            .then(res => dispatch(setAllConversations(res.data)))
            .catch(e => checkError(dispatch, e.response.status));
    };
};

export const filterConversations = (tags=['default']) => {
    let queryStr = '';
    tags.forEach((tag, idx) => queryStr += `tag[]=${tag}&`)
    return dispatch => {
        return axios
            .get(`/api/conversation/filter?${queryStr}`)
                .then(res => {
                    dispatch(setAllConversations(res.data))
                })
                .catch(e => checkError(dispatch, e.response.status));
    }
}

export const deleteConversation = conversationId => {
    return dispatch => {
        return axios
            .delete(`/api/conversation/${conversationId}`)
            .then(res => {
                dispatch(removeConversation(conversationId))
                checkSuccess(res.status)
            })
            .catch(e => checkError(dispatch, e.response.status));
    };
};