import { setActiveUser } from './action';
import axios from 'axios';

export const getActiveUser = () => {
  return dispatch => {
    return axios
      .get('/api/github/user')
      .then(user => {
        console.log('user redux', user.data);
        dispatch(setActiveUser(user.data));
      })
      .catch(e => console.error(e));
  };
};
