const mongoose = require('mongoose');
const Product = require('../models/product');

exports.getProducts = async (req, res) => {
    try {
        const products = await Product.find()
        // .then((response) => {

        //     console.log(response);
        //     return res.json(response);
        // })
        // .catch((error) => console.log(error.message));

        return res.json(products);
    } catch (error) {
        console.log(error.message);
        return res.json({ message: error.message });
    }
}
exports.singleProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findById(id);
        return res.json(product);
    } catch (error) {
        console.log(error.message);
        return res.json({ message: error.message });
    }
}