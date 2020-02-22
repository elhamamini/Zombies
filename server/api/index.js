const router = require('express').Router();
<<<<<<< HEAD
router.use('/github', require('./githubOuath'));
router.use('/users', require('./users'));
=======
const conversationRouter = require('./conversation');
const replyRouter = require('./reply');

router.use('/conversation', conversationRouter);
router.use('/reply', replyRouter);

>>>>>>> 1942569e8c6b593e0eb5f549d0a2fefc8badcc6c
router.use('*', (req, res, next) => {
  const err = new Error('API route not found!');
  err.status = 404;
  next(err);
});

module.exports = router;
