import { SET_ALL_REPLIES, REMOVE_REPLY } from './constants';

export const replies = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_REPLIES:
      return action.replies;
    case REMOVE_REPLY:
      return state.filter(reply => reply.id !== action.id);
    default:
      return state;
  }
};
