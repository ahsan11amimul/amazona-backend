const express = require('express');
const router = express.Router();
const { createOrder, showOrder, myOrder } = require('../controllers/order.js');
const { isAuth } = require('../middleware/auth');
router.post('/placeorder', isAuth, createOrder);
router.get('/orders/mine/', isAuth, myOrder);
router.get('/orders/:id', isAuth, showOrder);



module.exports = router;