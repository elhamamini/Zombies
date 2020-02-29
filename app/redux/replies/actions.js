import {
  ADD_REPLY,
  SET_REPLY,
  SET_ALL_REPLIES,
  EDIT_REPLY,
  REMOVE_REPLY,
} from './constants';

export const addReply = reply => {
  return {
    type: ADD_REPLY,
    reply,
  };
};

export const editReply = reply => {
  return {
    type: EDIT_REPLY,
    reply,
  };
};

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

export const removeReply = id => {
  return {
    type: REMOVE_REPLY,
    id,
  };
};
