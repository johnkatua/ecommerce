const express = require('express');
const router = express.Router();

const {create, productById, read, remove, update, list, listRelated, listCategories, listBySearch, photo, searchList} = require('../controllers/product');
const { requireSignin, isAdmin, isAuth } = require('../controllers/auth');
const {userById} = require('../controllers/user');

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/product/:productId', read);
router.delete('/product/:productId/:userId', requireSignin, isAdmin, isAuth, remove);
router.put('/product/:productId/:userId', requireSignin, isAdmin, isAuth, update);
router.get('/products', list);
router.get('/products/related/:productId', listRelated);
router.get('/products/categories', listCategories);
router.post('/products/by/search', listBySearch);
router.get('/product/photo/:productId', photo);
router.get('/products/search', searchList);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;