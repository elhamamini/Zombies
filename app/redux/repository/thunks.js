import axios from 'axios';

import { setAllrepos } from './actions';
import { checkError } from '../statusMessage/utils';

export const getRepos = () => {
  return (dispatch, getState) => {
    return axios
      .post('/api/github/user/repos', {
        githubUsername: getState().user.githubUsername,
      })
      .then(res => dispatch(setAllrepos(res.data)))
      .catch(e => checkError(dispatch, e.response.status));
  };
};
