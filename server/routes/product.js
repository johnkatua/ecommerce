const express = require('express');
const router = express.Router();

const {create, productById, read} = require('../controllers/product');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');
const {userById} = require('../controllers/user');

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/product/:productId', read);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;