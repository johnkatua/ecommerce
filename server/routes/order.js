const express = require('express');
const router = express.Router();

const { create, listOrder } = require('../controllers/order');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { decreaseQuantity } = require('../controllers/product');

router.post('/order/create/:userId', requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create);
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrder);

router.param('userId', userById);

module.exports = router;
