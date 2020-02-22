const router = require('express').Router();
const conversationRouter = require('./conversation');
const replyRouter = require('./reply');

router.use('/conversation', conversationRouter);
router.use('/reply', replyRouter);

router.use('*', (req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
