import axios from 'axios';

import { setTags } from './actions';

export const fetchTags = () => {
    return dispatch => {
      return axios
        .get('/api/tag')
        .then(response => dispatch(setTags(response.data)))
        .catch(e => console.log('Error in thunk:', e));
    };
  };
