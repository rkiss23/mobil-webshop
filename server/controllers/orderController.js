const Order = require('../models/order');

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.send(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Error fetching orders');
  }
};

const addOrder = async (req, res) => {
  try {
    const { orderNumber, user, products, totalPrice, orderDate } = req.body;
    const newOrder = new Order({
      orderNumber,
      user,
      products,
      totalPrice,
      orderDate
    });
    await newOrder.save();
    res.json('Order added successfully');
  } catch (error) {
    console.error('Error adding order:', error);
    res.status(500).send('Error adding order');
  }
};

const updateOrder = async (req, res) => {
    try {
      const { id, orderNumber, user, products, totalPrice, orderDate } = req.body;
  
      const order = await Order.findOne({ _id: id });
  
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
  
      order.orderNumber = orderNumber;
      order.user = user;
      order.products = products;
      order.totalPrice = totalPrice;
      order.orderDate = orderDate;
  
      await order.save();
  
      res.json('Order updated successfully');
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ message: 'Error updating order' });
    }
  };

const deleteOrder = async (req, res) => {
  try {
    const result = await Order.deleteOne({ _id: req.query.id });

    if (result.deletedCount === 0) {
      return res.status(404).send('Order not found');
    }

    res.json('Deleted successfully');
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).send('Error deleting order');
  }
};

module.exports = { 
    getOrders,
    addOrder,
    deleteOrder,
    updateOrder
 };