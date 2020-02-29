import {
  SET_REPLY,
  SET_ALL_REPLIES,
} from './constants';

export const setAllReplies = replies => {
  return {
    type: SET_ALL_REPLIES,
    replies,
  };
};

export const setReply = reply => {
  return {
    type: SET_REPLY,
    reply,
  };
};
