const Order = require('../models/order');
const mongoose = require('mongoose');

const ordersArray = [
  {
    orderNumber: 'ORD123',
    user: new mongoose.Types.ObjectId('648a6f6b3f4b4b7a2d7f8a66'),
    products: [
      {
        product: new mongoose.Types.ObjectId('648a70bf3f4b4b7a2d7f8a67'),
        quantity: 2
      }
    ],
    totalPrice: 50000
  }
];

async function createAndSaveOrder() {
  try {
    for (const orderData of ordersArray) {
      const existingOrder = await Order.findOne({ orderNumber: orderData.orderNumber });
      if (existingOrder) {
        console.log(`Order "${orderData.orderNumber}" already exists, not inserting again.`);
        continue;
      }
      const newOrder = new Order(orderData);
      await newOrder.save();
      console.log(`Order "${orderData.orderNumber}" saved!`);
    }
  } catch (err) {
    console.error('Error saving order:', err);
  }
}

module.exports = createAndSaveOrder;
