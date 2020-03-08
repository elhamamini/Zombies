const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User, Cohort } = require('../db/index');

const saltRounds = 12;

router.get('/', (req, res, next) => {

  if(req.headers.authorization !== `Bearer admin`) {
    res.status(403).send('You do not have permission to perform this action. Contact administrator.')
  }

  User.findAll({
    include: {
      model: Cohort,
    },
  })
    .then(users => {
      res.status(200).send(users);
    })
    .catch(e => {
      res.status(500).send(e);
      next(e);
    });
});

router.get('/:id', (req, res, next) => {
  User.findByPk(req.params.id, {
    include: {
      model: Cohort,
    },
  })
    .then(userOrNull => {
      if (userOrNull) {
        res.status(200).send(userOrNull);
      } else {
        res.status(404).send('there is no user with that id');
      }
    })
    .catch(e => {
      res.status(500);
      next(e);
    });
});

router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, saltRounds)
  .then(hash => {
    User.create({
      ...req.body,
      password: hash
    })
    .then(createdUser => res.status(201).send(createdUser))
    .catch(e => {
      res.status(500);
      next(e);
    })
  })
});

router.put('/:id', (req, res, next) => {

  if(req.headers.authorization !== `Bearer admin` && req.headers.authorization !== `Bearer user`) {
    res.status(403).send('You do not have permission to perform this action. Contact administrator.')
  }

  User.findByPk(req.params.id)
    .then(userOrNull => {
      if (userOrNull) {
        userOrNull.update(req.body);
        res.status(202).send(userOrNull);
      } else {
        res.status(404).send();
      }
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {

  if(req.headers.authorization !== `Bearer admin`) {
    res.status(403).send('You do not have permission to perform this action. Contact administrator.')
  }

  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(data => {
      if (data) {
       res.sendStatus(204);
      } else {
        res.sendStatus(404).send();
      }
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

module.exports = router;
