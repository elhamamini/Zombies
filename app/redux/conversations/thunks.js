import axios from 'axios';

import {
    setCurrentConversation,
    setAllConversations,
} from './actions';


//--------
//CURRENT VIEW CONVERSATION THUNKS 

//Fetch a single conversation by Id, set it as the current view
export const fetchCurrentConversation = conversationId => {
    return dispatch => {
        return axios
            .get(`/api/conversation/${conversationId}`)
            .then(res => dispatch(setCurrentConversation(res.data)))
            .catch(e => console.error(e));
    };
};

//create a new conversation, and set it as the current view
export const createConversation = content => {
    return dispatch => {
        return axios
            .post(`/api/conversation`, { ...content })
            .then(res => dispatch(setCurrentConversation(res.data)))
            .catch(e => console.log(e));
    };
};

//push updates to a conversation, and update the current view with the results
export const updateConversation = (conversationId, content) => {
    return dispatch => {
        return axios
            .put(`/api/conversation/${conversationId}`, { content })
            .then(res => dispatch(setCurrentConversation(res.data)))
            .catch(e => console.error(e));
    };
};

//delete a conversation. Sets the current conversation to null(?)
//also triggers a fetch of All Conversations, to prevent the user from getting to deleted content
export const deleteConversation = conversationId => {
    return dispatch => {
        return axios
            .delete(`/api/conversation/${conversationId}`)
            .then(res => dispatch(setCurrentConversation(null)))
            .then(() => dispatch(fetchAllConversations()))
            .catch(e => console.error(e));
    };
};

//-------
//ALL CONVERSATIONS THUNKS

//sets all the conversations
export const fetchAllConversations = (page=0) => {
    return dispatch => {
        return axios
            .get(`/api/conversation?page=${page}`)
            .then(res => dispatch(setAllConversations(res.data)))
            .catch(e => console.error(e));
    };
};

//sets the conversations list to a filtered subset
export const filterConversations = (tag) => {
    return dispatch => {
        return axios
            .get(`/api/tag/${tag}`)
            .then(res => dispatch(setAllConversations(res.data.conversations)))
            .catch(e => console.error(e));
    }
}

//-------------
