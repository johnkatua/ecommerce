const express = require('express');
const router = express.Router();

const { create } = require('../controllers/order');
const { userById } = require('../controllers/user');
const { requireSignin, isAuth } = require('../controllers/auth');

router.get('/order/create/:userId', requireSignin, isAuth, create);

router.param('userId', userById);

module.exports = router;
