const express = require('express');
const router = express.Router();
const { getProducts, singleProduct } = require('../controllers/product.js');
router.get('/products', getProducts);
router.get('/product/:id', singleProduct);

module.exports = router;