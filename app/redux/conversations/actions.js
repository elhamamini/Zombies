import {
    SET_CURRENT_CONVERSATION,
    SET_ALL_CONVERSATIONS,
} from './constants';

export const setCurrentConversation = conversation => {
    return {
        type: SET_CURRENT_CONVERSATION,
        conversation
    };
};

export const setAllConversations = allConversations => {
    return {
        type: SET_ALL_CONVERSATIONS,
        allConversations
    };
};
