const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/index');

const saltRounds = 12;

router.post('/login', (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(userOrNull => {
      if (!userOrNull) {
        res.send(401).send();
      } else {
        bcrypt.compare(req.body.password, userOrNull.password)
        .then(result => {
          if(result) {
            if (userOrNull.userType === 'admin') {
              req.session.admin = true;
            } else {
              req.session.admin = false;

              userOrNull.update(
                { sessionId: req.session.id },
                { returning: true }
              )
              .then(userOrNull => res.status(200).send(userOrNull))
            }
          } else {
            res.send('Incorrect password')
          }
        })
      }
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

// router.post('/signup', (req, res, next) => {
//   bcrypt.hash(req.body.password, saltRounds)
//   .then(hash => {
//   req.body.password = hash;
//   User.findOrCreate({
//     where: req.body,
//   })
//     .then(user => {
//       if (!user) return res.status(500).send('error creating user');
//       res.send(user);
//     })
//   })
//     .catch(e => {
//       res.status(500).send();
//       next(e);
//     });
// });

router.put('/logout', (req, res, next) => {
  User.findByPk(req.body.id)
  .then(user => user.update({ loggedIn: false }))
  .then(() => {
    req.session.destroy();
    res.status(204).send();
  })
  .catch(e => {
    res.status(500).send()
    next(e)
  })
});

router.get('/me', (req, res, next) => {
  if (req.loggedIn) return res.send(req.user1);
  res.status(401);
  const err = new Error('Not logged in');
  console.error(err);
  next();
});

module.exports = router;
