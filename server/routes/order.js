const express = require('express');
const router = express.Router();

const { create } = require('../controllers/order');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const { requireSignin, isAuth } = require('../controllers/auth');

router.post('/order/create/:userId', requireSignin, isAuth, addOrderToUserHistory, create);

router.param('userId', userById);

module.exports = router;
