const authenticate = require('../middlewares/auth-middleware');
const express = require('express');
const {
  userRegistration,
  userLogin,
  changePassword,
} = require('../controller/user-contoller');
// create express router
const router = express.Router();

// all routes that are related to users only
router.post('/register', userRegistration);
router.post('/login', userLogin);
router.post('/changePassword', authenticate, changePassword);

module.exports = router;
