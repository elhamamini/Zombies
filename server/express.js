const express = require('express');
const path = require('path');
const chalk = require('chalk');
const session = require('express-session');
const { User } = require('./db/index');
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const app = express();
const users = {};
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  console.log(chalk.cyan(`${new Date().toString()}: ${req.path}`));
  next();
});
app.use(
  session({
    secret: 'hopethisworks',
    resave: false,
    cookie: {
      maxAge: 7.2 * Math.exp(10, 6),
    },
  })
);

// session logging
app.use((req, res, next) => {
  next();
});
app.use((req, res, next) => {
  // find if user exists based on session id
  User.findOne({ where: { sessionId: req.session.id } })
    .then(userOrNull => {
      req.user = {};
      if (!userOrNull) {
        req.user.loggedIn = false;
      } else {
        req.user.loggedIn = true;
        if (userOrNull.github_access_token) {
          req.user.github_access_token = userOrNull.github_access_token;

        }
      }
    })
    .then(next)
    .catch(next);
});

// app.use((req, res, next) => {

//   if (!users[req.session.userId]) {
//     User.findByPk(req.session.userId)
//       .then(userOrNull => {
//         if (!userOrNull) req.loggedIn = false;
//         else {
//           req.loggedIn = true;
//           req.user = userOrNull;

//           req.github_access_token = userOrNull.github_access_token;
//           users[req.session.userId] = userOrNull.github_access_token;

//           if (userOrNull.userType === 'admin') {
//             req.session.admin = true;
//           } else {
//             req.session.admin = false;
//           }

//         }
//         next();
//       })
//       .catch(e => {
//         console.log('error searching for a user by session.userId');
//         console.error(e);

//       });
//   } else {
//     req.github_access_token = users[req.session.userId];
//     next();
//   }
// });

app.use('/auth', require('./auth'));
app.use(express.static(path.join(__dirname, '../public')));
app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.use((err, req, res, next) => {
  // this is for testing; so if we don't have tests we can remove it
  if (process.env.NODE_ENV !== 'test') console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
  next();
});

module.exports = app;
