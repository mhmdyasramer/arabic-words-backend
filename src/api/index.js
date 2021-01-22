const express = require('express');
const router = express.Router();
const words = require('./words');

router.get('/', (req, res, next) => {
  res.json({ message: 'Welcome to the API index' });
});

router.use('/words', words);

module.exports = router;