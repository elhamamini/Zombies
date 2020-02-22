const router = require('express').Router();
const { User } = require('../db/index');
const axios = require('axios');
router.get('/login', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});
router.get('/callback', (req, res) => {
  const { code } = req.query;

  axios
    .post(
      `https://github.com/login/oauth/access_token?code=${code}&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
      {},
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )
    .then(res => {
      console.log('Github Response: ', res.data);

      User.create({
        github_access_token: res.data.access_token,
        userType: 'user',
      });
    })
    .then(() => {
      res.redirect('/');
    })
    .catch(e => {
      console.log(chalk.red('Error authenticating with Github.'));
      console.error(e);
      res.redirect('/error');
    });
});
// this router is user info if in case we want the name or image ot whatever later in frontend
router.get('/user', (req, res) => {
  axios
    .get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${req.github_access_token}`,
      },
    })
    .then(axRes => {
      console.log('axRes', axRes);
      res.send(axRes.data);
    })
    .catch(e => {
      console.log(
        chalk.red('Error while getting response from github user route.')
      );
      console.error(e);
      res.redirect('/error');
    });
});
module.exports = router;
