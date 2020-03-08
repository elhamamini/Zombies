import { SET_ALL_REPLIES } from './constants';

export const setAllReplies = replies => {
  return {
    type: SET_ALL_REPLIES,
    replies,
  };
};
