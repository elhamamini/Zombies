import { SET_ALL_REPLIES, SET_REPLY } from './constants';

export const replies = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_REPLIES:
      return action.replies;
    case SET_REPLY:
      return action.reply;
    default:
      return state;
  }
};
