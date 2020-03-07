const router = require('express').Router();
const { User } = require('../db/index');
const bcrypt = require('bcrypt');
const saltRounds = 20;

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
      github_access_token: null,
    },
  })
    .then(userOrNull => {
      if (!userOrNull) return res.sendStatus(401);
      // req.session.userId = userOrNull.id;
      if (userOrNull.userType === 'admin') {
        req.session.admin = true;
      } else {
        req.session.admin = false;
      }
      return userOrNull.update(
        { sessionId: req.session.id },
        { returning: true }
      );
    })
    .then(userOrNull => {
      res.status(200).send(userOrNull);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds)
  .then(hash => {
  console.log(hash)
  req.body.password = hash;
  User.findOrCreate({
    where: req.body,
  })
    .then(user => {
      if (!user) return res.status(500).send('error creating user');
      // req.session.userId = user.id;
      if (user.userType === 'admin') {
        req.session.admin = true;
      } else {
        req.session.admin = false;
      }
      res.send(user);
    })
  })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.get('/logout', (req, res, next) => {
  req.session.destroy();
  // delete req.session.userId;
  // delete req.session.admin;
  res.sendStatus(204);
  next();
});

router.get('/me', (req, res, next) => {
  if (req.loggedIn) return res.send(req.user1);
  res.status(401);
  const err = new Error('Not logged in');
  console.error(err);
  next();
});

module.exports = router;
