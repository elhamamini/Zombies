import axios from 'axios';

import { checkError } from '../statusMessage/utils';

export const fetchRepos = username => {
  return dispatch => {
    return axios
      .post('/api/github/user/repos', { githubUsername: username })
      .catch(e => { 
        console.log(e)
        checkError(dispatch, e.response.status)
      });
  };
};
