const mongoose = require('mongoose');
const productSchema = mongoose.Schema({
    name: String,
    category: String,
    image: String,
    price: Number,
    brand: String,
    countInStock: Number,
    numReviews: Number,
    rating: Number,
    description: String
});
module.exports = Product = mongoose.model('Product', productSchema);