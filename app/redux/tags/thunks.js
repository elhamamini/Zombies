import axios from 'axios';

import { setTags, setWhitelist, setActive } from './actions';
import { checkError } from '../statusMessage/utils';

export const fetchTags = () => {
  return dispatch => {
    return axios
      .get('/api/tag')
      .then(response => dispatch(setTags(response.data)))
      .then(() => dispatch(setWhitelist()))
      .then(() => dispatch(setActive()))
      .catch(e => checkError(dispatch, e.response.status));
  };
};
