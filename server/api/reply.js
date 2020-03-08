const router = require('express').Router();
const Sequelize = require('sequelize');
const { Conversation, Reply, Activity, User } = require('../db');

const RESULTS_PER_PAGE = 25;

//return all replies
router.get('/', (req, res, next) => {

  if(req.headers.authorization !== `Bearer admin`) {
    return res.status(403).send('You do not have permission to perform this action. Contact administrator')
  }

  Reply.findAll({
    where: {
      isFlagged: true,
    },
    order: [['createdAt', 'DESC']],
    include: {
      model: Conversation,
    },
  })
    .then(replies => res.send(replies))
    .catch(e => console.error(e));
});

router.get('/search', (req, res, next) => {
  const { term } = req.query;
  Reply.findAll({
    where: {
      body: { [Sequelize.Op.iLike]: `%${term}%` },
    },
    include: { model: Conversation },
  })
    .then(replies => res.send(replies))
    .catch(e => console.error(e));
});

//return a single reply
router.get('/:id', (req, res, next) => {
  Reply.findOne({
    where: {
      id: req.params.id,
    },
    include: {
      model: Activity,
    },
  })
    .then(result => {
      result ? res.status(200).send(result) : res.status(404).send(null);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.post('/', (req, res, next) => {

  const { conversationId, userId } = req.body;

  if(!userId) {
    return res.status(401).send('Sign in to perform this action')
  }
  if(!conversationId) {
    return res.status(400).send('POST reply request missing conversationId');
  }
  if(req.headers.authorization !== `Bearer ${userId}`) {
    return res.status(403).send('You do not have permission to perform this action. Contact administrator.')
  }

  Reply.create({
    ...req.body,
  })
    .then(created => {
      res.status(200).send(created);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.put('/:id', (req, res, next) => {

  if(req.headers.authorization !== `Bearer user` && req.headers.authorization !== `Bearer admin`) {
    return res.status(403).send('You do not have permission to perform this action. Contact administrator.')
  }

  Reply.update(
    {
      ...req.body,
    },
    {
      where: { id: req.params.id },
      returning: true,
    }
  )
    .then(updated => {
      updated
        ? res.status(201).send(updated[1][0])
        : res.status(404).send(null);
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

router.delete('/:id', (req, res, next) => {

  if(req.headers.authorization !== `Bearer admin` && req.headers.authorization !== `Bearer user`) {
    res.status(403).send('You do not have permission to perform this request. Contact administrator.')
  }

  Reply.destroy({
    where: {
      id: req.params.id,
    },
    include: [{ model: Activity }],
  })
    .then(destroyed => {
      destroyed
        ? res.status(200).send({ success: true })
        : res.status(404).send({ success: false });
    })
    .catch(e => {
      res.status(500).send();
      next(e);
    });
});

module.exports = router;
