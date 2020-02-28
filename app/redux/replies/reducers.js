import {
  CREATE_REPLY,
  SET_REPLY,
  SET_ALL_REPLIES,
  EDIT_REPLY,
  REMOVE_REPLY,
} from './constants';

export const replies = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_REPLIES:
      return action.replies;

    case CREATE_REPLY:
      return [...state, action.reply];

    case EDIT_REPLY:
      return state.map(reply => {
        if (reply.id === action.reply.id) return action.reply;
        return reply;
      });

    case REMOVE_REPLY:
      return state.filter(reply => reply.id !== action.id);
      
    default:
      return state;
  }
};
