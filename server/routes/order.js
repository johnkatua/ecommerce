const express = require('express');
const router = express.Router();

const { create } = require('../controllers/order');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const { requireSignin, isAuth } = require('../controllers/auth');
const { decreaseQuantity } = require('../controllers/product');

router.post('/order/create/:userId', requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create);

router.param('userId', userById);

module.exports = router;
