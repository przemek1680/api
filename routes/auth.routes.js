const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const verifyToken = require('../verifyToken');
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/activate/:token', authController.activate);
router.post('/logout', authController.logout);
router.post(
  '/change-password',
  verifyToken,
  authController.changePassword
);
module.exports = router;
