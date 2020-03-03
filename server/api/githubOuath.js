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
    .then(async authRes => {
      const userRes = await axios.get('https://api.github.com/user', {
        headers: {
          Authorization: `token ${authRes.data.access_token}`,
        },
      });
      const userData = userRes.data;
      return User.findOrCreate({
        where: { email: userData.email },
        defaults: {
          github_access_token: authRes.data.access_token,
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
        return [user, created, authRes];
      });
    })
    .then(([user, created, authRes]) => {
      console.log('user gh at updated');
      if (!created) {
        user.update({
          github_access_token: authRes.data.access_token,
          sessionId: req.session.id,
        });
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
