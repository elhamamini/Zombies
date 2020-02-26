import {
    EDIT_CONVERSATION,
    GET_CONVERSATION,
    GET_ALL_CONVERSATIONS,
    REMOVE_CONVERSATION
} from './constants';

//TODO: Finish reducer with Delete Case

export const conversation = (state = {}, action) => {
    switch(action.type) {
        case EDIT_CONVERSATION:
            return action.conversation;
        case GET_CONVERSATION:
            return action.conversation;

        default:
            return state;
    };
};

export const allConversations = (state = [], action) => {
    switch(action.type) {
        case GET_ALL_CONVERSATIONS:
            return action.allConversations
    default:
        return state;
    };
};