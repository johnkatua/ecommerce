const express = require('express');
const router = express.Router();
const {welcomeUser} = require('../controllers/user');

router.get('/user', welcomeUser);

module.exports = router;