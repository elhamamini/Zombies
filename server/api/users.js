const router = require('express').Router();
const { User, Cohort } = require('../db/index');

router.get('/', (req, res, next) => {
  User.findAll({
    include: {
      model: Cohort,
    },
  })
    .then(users => {
      res.status(200).send(users);
    })
    .catch(e => {
      console.error(e);
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
  User.create(req.body)
    .then(createdUser => {
      res.status(201).send(createdUser);
    })
    .catch(e => {
      res.status(500);
      next(e);
    });
});

router.put('/:id', (req, res, next) => {
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
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(data => {
      if (data) return res.sendStatus(204);
      res.sendStatus(404).send();
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

module.exports = router;
