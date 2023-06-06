const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../authMiddleware');
const authController = require('../controllers/auth.controller');
router.use(authMiddleware.adminOnly);
router.get('/', adminController.adminPanel);


module.exports = router;
