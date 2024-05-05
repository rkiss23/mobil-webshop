const Express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const createAndSaveUsers = require('./migrations/user');
const createAndSaveProducts = require('./migrations/product');
const createAndSaveOrders = require('./migrations/order');
const createAndSaveReviews = require('./migrations/review');

const productController = require('./controllers/productController');
const orderController = require('./controllers/orderController');
const userController = require('./controllers/userController');
const reviewController = require('./controllers/reviewController');
const authController = require('./controllers/authController');


const app = Express();
app.use(cors());
app.use(Express.json()); 
app.use(Express.urlencoded({ extended: true })); 

const CONNECTION_STRING = "mongodb+srv://kissrobert2399:vtTtsJWA1HXUdOn5@cluster0.rsfm8av.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


async function startApp() {
    try {
        const client = await mongoose.connect(CONNECTION_STRING);
        console.log('Connected to database');

        await createAndSaveUsers();
        await createAndSaveProducts();
        await createAndSaveOrders();
        await createAndSaveReviews();


        app.get('/api/products/get', productController.getProducts);
        app.post('/api/products/add', productController.addProduct);
        app.put('/api/products/update', productController.updateProduct);
        app.delete('/api/products/delete', productController.deleteProduct);


        app.get('/api/orders', orderController.getOrders);
        app.post('/api/orders/add', orderController.addOrder);
        app.put('/api/orders/update', orderController.updateOrder);
        app.delete('/api/orders/delete', orderController.deleteOrder);

        app.get('/api/users', userController.getUsers);
        app.post('/api/users/add', userController.addUser);
        app.put('/api/users/update', userController.updateUser);
        app.delete('/api/users/delete', userController.deleteUser);

        app.get('/api/reviews', reviewController.getReviews);
        app.post('/api/reviews/add', reviewController.addReview);
        app.put('/api/reviews/update', reviewController.updateReview);
        app.delete('/api/reviews/delete', reviewController.deleteReview);

        app.post('/api/register', authController.register);
        app.post('/api/login', authController.login);
      


        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

startApp();