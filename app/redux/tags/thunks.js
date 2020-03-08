import axios from 'axios';

import { setTags, setWhitelist, setActive } from './actions';

export const fetchTags = () => {
  return dispatch => {
    return axios
      .get('/api/tag')
      .then(response => dispatch(setTags(response.data)))
      .then(() => dispatch(setWhitelist()))
      .then(() => dispatch(setActive()))
      .catch(e => console.log('Error in thunk:', e));
  };
};
