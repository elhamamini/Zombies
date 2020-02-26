import {
    EDIT_CONVERSATION,
    GET_CONVERSATION,
    REMOVE_CONVERSATION,
    GET_ALL_CONVERSATIONS
} from './constants';

export const createConversation = conversation => {
    return {
        type: EDIT_CONVERSATION,
        conversation
    };
};

export const setConversation = conversation => {
    return {
        type: GET_CONVERSATION,
        conversation
    };
};

export const setAllConversations = conversations => {
    return {
        type: GET_ALL_CONVERSATIONS,
        conversations
    };
};

export const removeConversation = () => {
    return {
        type: REMOVE_CONVERSATION,
        conversation
    };
};