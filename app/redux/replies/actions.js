import { UPDATE_REPLY, SET_ALL_REPLIES, REMOVE_REPLY } from './constants';

export const setAllReplies = replies => {
  return {
    type: SET_ALL_REPLIES,
    replies,
  };
};

// export const editReply = reply => {
//   return {
//     type: UPDATE_REPLY,
//     reply,
//   };
// };
export const removeReply = id => {
  return {
    type: REMOVE_REPLY,
    id,
  };
};
