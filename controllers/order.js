const mongoose = require('mongoose');
const Order = require('../models/order');


exports.createOrder = async (req, res) => {
    if (req.body.orderItems.length === 0) {
        res.status(400).send({ message: 'Cart is empty' });
    } else {

        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user.id,
        });
        const createdOrder = await order.save();
        return res.status(201).json({ message: 'New Order Created', order: createdOrder });
    }
}
exports.showOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await Order.findById(id);
        return res.status(200).json(order);

    } catch (error) {
        res.status(500).json({ message: error.message })
    }

}
exports.myOrder = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });

        return res.status(200).json(orders);
    } catch (error) {

        return res.status(500).json({ message: error.message });
    }
}