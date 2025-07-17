const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userEmail: String,
    productName: String,
    amount: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', OrderSchema); 