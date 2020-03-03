import { SET_TAGS, SET_WHITELIST, SET_ACTIVE } from './constants';

export const setTags = tags => {
  return {
    type: SET_TAGS,
    tags,
  };
};

export const setWhitelist = () => {
  return {
    type: SET_WHITELIST,
  };
};

export const setActive = () => {
  return {
    type: SET_ACTIVE,
  }
}