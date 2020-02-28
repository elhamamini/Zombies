const router = require('express').Router();

router.use('/github', require('./githubOuath'));
router.use('/users', require('./users'));

const conversationRouter = require('./conversation');
const replyRouter = require('./reply');
const tagRouter = require('./tag');

router.use('/conversation', conversationRouter);
router.use('/reply', replyRouter);
router.use('/tag', tagRouter);

router.use('*', (req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
