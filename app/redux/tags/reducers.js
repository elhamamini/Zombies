import { SET_TAGS } from './constants';

export const tags = (state = [], action) => {
  switch (action.type) {
    case SET_TAGS:
      return action.tags;
    default:
      return state;
  }
};

