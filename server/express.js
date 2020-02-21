const express = require('express');
const path = require('path');
const chalk = require('chalk');
const session = require('express-session');
const app = express();
const { User } = require('./db/index');

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
  User.findByPk(req.session.userId)
    .then(userOrNull => {
      if (!userOrNull) req.loggedIn = false;
      else {
        req.loggedIn = true;
        req.user = userOrNull;
        if (userOrNull.userType === 'admin') {
          req.session.admin = true;
        } else {
          req.session.admin = false;
        }
      }
      next();
    })
    .catch(e => {
      console.log('error searching for a user by session.userId');
      console.error(e);
      next();
    });
});
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
