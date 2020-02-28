import {
    SET_CURRENT_CONVERSATION,
    SET_ALL_CONVERSATIONS,
} from './constants';

//TODO: Finish reducer with Delete Case

export const conversation = (state = {}, action) => {
    switch(action.type) {
        case SET_CURRENT_CONVERSATION:
            return action.conversation;
        default:
            return state;
    };
};

export const allConversations = (state = [], action) => {
    switch(action.type) {
        case SET_ALL_CONVERSATIONS:
            return action.allConversations
    default:
        return state;
    };
};