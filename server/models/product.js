const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true },
    title: {type: String, required: true },
    description: { type: String, required: true }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;