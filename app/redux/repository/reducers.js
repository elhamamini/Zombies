import { SET_ALL_REPOS } from './constants';

export const repositories = (state = [], action) => {
  switch (action.type) {
    case SET_ALL_REPOS:
      return action.repos;

    default:
      return state;
  }
};
