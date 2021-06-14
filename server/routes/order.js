const express = require('express');
const router = express.Router();

const { create, listOrder, getStatusValues, updateOrderStatus, orderById } = require('../controllers/order');
const { userById, addOrderToUserHistory } = require('../controllers/user');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth');
const { decreaseQuantity } = require('../controllers/product');
const { orderBy } = require('lodash');

router.post('/order/create/:userId', requireSignin, isAuth, addOrderToUserHistory, decreaseQuantity, create);
router.get('/order/list/:userId', requireSignin, isAuth, isAdmin, listOrder);
router.get('/order/getValues/:userId', requireSignin, isAuth, isAdmin, getStatusValues);
router.put('/order/:orderId/status/:userId', requireSignin, isAuth, isAdmin, updateOrderStatus);

router.param('userId', userById);
router.param('orderId', orderById);

module.exports = router;
