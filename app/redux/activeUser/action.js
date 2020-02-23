import { SET_ACTIVE_USER } from './constants';
export const setActiveUser = user => {
  return {
    type: SET_ACTIVE_USER,
    user,
  };
};
