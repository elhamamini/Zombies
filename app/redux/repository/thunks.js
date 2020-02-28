import axios from 'axios';

import { setAllrepos } from './actions';

export const getRepos = () => {
  return (dispatch, getState) => {
    return axios
      .post('/api/github/user/repos', {
        githubUsername: getState().activeUser.githubUsername,
      })
      .then(repos => dispatch(setAllrepos(repos.data)))
      .catch(e => console.error(e));
  };
};
