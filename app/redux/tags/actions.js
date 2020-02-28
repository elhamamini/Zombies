import { SET_TAGS } from './constants';

export const setTags = tags => {
    return {
      type: SET_TAGS,
      tags,
    };
  };