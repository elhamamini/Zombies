const router = require('express').Router();
const { User } = require('../db/index');
const chalk = require('chalk');
const axios = require('axios');
router.get('/login', (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`
  );
});
router.get('/callback', (req, res) => {
  const { code } = req.query;
  console.log('codeeeeeee', code);

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
    .then(async res => {
      console.log('info', res.data);
      const response = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${res.data.access_token}`,
        },
      });
      const userData = response.data;
      console.log('userDataaaaaaa@@@@@@@', userData);
      return User.findOrCreate({
        where: { sessionId: req.session.id },
        defaults: {
          github_access_token: res.data.access_token,
          userType: 'user',
          sessionId: req.session.id,
          githubUsername: userData.login,
          reposUrl: userData.repos_url,
          name: userData.name,
          email: userData.email,
          image: userData.avatar_url,
          bio: userData.bio,
        },
      }).then(([user, created]) => {
        return [user, created, res];
      });
    })
    .then(([user, created, res]) => {
      if (!created) {
        user.update({ github_access_token: res.data.access_token });
      }
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
// router.get('/user', (req, res) => {
//   console.log('token', req.user.github_access_token);
//   axios
//     .get('https://api.github.com/user', {
//       headers: {
//         Authorization: `token ${req.user.github_access_token}`,
//       },
//     })
//     .then(axRes => {
//         // User.findOne({where:{githubUsername:}})
//       res.send(axRes.data);
//     })
//     .catch(e => {
//       console.log(
//         chalk.red('Error while getting response from github user route.')
//       );
//       console.error(e);
//       res.redirect('/error');
//     });
// });
router.get('/user', (req, res) => {
  User.findOne({
    where: {
      github_access_token: req.user.github_access_token,
    },
  })
    .then(user => res.send(user))
    .catch(e => {
      console.error(e);
    });
});
router.post('/user/repos', (req, res, next) => {
  // console.log('req.body', req.body);
  axios
    .get(`https://api.github.com/users/${req.body.githubUsername}/repos`, {
      //   headers: {
      //     Authorization: `token ${req.user.github_access_token}`,
      //   },
    })
    .then(repos => {
      res.send(repos.data);
    })
    .catch(e => {
      console.log(
        chalk.red('Error while getting response from github user/repo route.')
      );
      //   console.error(e);
      res.redirect('/error');
    });
});
module.exports = router;
