const express = require('express');
const router = express.Router();
const verifyToken = require('../verifyToken');

router.get('/', verifyToken, (req, res) => {
  res.render('profile');
});

module.exports = router;
