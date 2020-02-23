import { SET_ALLREPOS } from './constants';

export const reposetoriesReducer = (state = [], action) => {
  switch (action.type) {
    case SET_ALLREPOS:
      return action.repos;

    default:
      return state;
  }
};
