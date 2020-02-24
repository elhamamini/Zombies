import { SET_ALLREPOS } from './constants';
export const setAllrepos = repos => {
  return {
    type: SET_ALLREPOS,
    repos,
  };
};
