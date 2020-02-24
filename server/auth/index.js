const router = require('express').Router();
const { User } = require('../db/index');

router.post('/login', (req, res, next) => {
  console.log(req.body);
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password,
    },
  })
    .then(userOrNull => {
      if (!userOrNull) return res.sendStatus(401);
      req.session.userId = userOrNull.id;
      if (userOrNull.userType === 'admin') {
        req.session.admin = true;
      } else {
        req.session.admin = false;
      }
      res.status(200).send(userOrNull);
    })
    .catch(next);
});

router.post('/signup', (req, res, next) => {
  User.findOrCreate({
    where: req.body,
  })
    .then(user => {
      if (!user) return res.status(500).send('error creating user');
      req.session.userId = user.id;
      if (user.userType === 'admin') {
        req.session.admin = true;
      } else {
        req.session.admin = false;
      }
      res.send(user);
    })
    .catch(next);
});

router.get('/signout', (req, res, next) => {
  delete req.session.userId;
  delete req.session.admin;
  res.sendStatus(204);
  next();
});

router.get('/me', (req, res, next) => {
<<<<<<< HEAD
  if (req.loggedIn) return res.send(req.user1);
=======
  if (req.user.loggedIn) return res.send(req.user.user);
>>>>>>> 8b00cb7d3806c7a94823a3d5d09379bc61c9a4c9
  res.status(401);
  const err = new Error('Not logged in');
  console.error(err);
  next();
});

module.exports = router;
