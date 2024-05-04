const Express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const migrateProducts = require('./migrations/product');
const Product = require('./models/product')


const app = Express();
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://kissrobert2399:vtTtsJWA1HXUdOn5@cluster0.rsfm8av.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASENAME = "webshop";
let database;


async function startApp() {
    try {
        const client = await mongoose.connect(CONNECTION_STRING);
        console.log('Connected to database');

        await migrateProducts();


        app.get('/api/webshop/GetProducts', async (req, res) => {
            try {
              const products = await Product.find();
              res.send(products);
            } catch (error) {
              console.error('Error fetching products:', error);
              res.status(500).send('Error fetching products');
            }
          });

          app.post('/api/webshop/AddProduct', async (req, res) => {
            try {
              const productCount = await Product.countDocuments();
              const newProduct = new Product({
                id: (productCount + 1).toString(),
                description: req.body.productName
              });
            } catch (error) {
                console.error('Error inserting product:', error);
                res.status(500).send('Error inserting product');
            }
        });


        app.delete('/api/webshop/DeleteProduct', (request, response) => {
            database.collection('webshopcollection').deleteOne({
                id: request.query.id
            }, (err) => {
                if (err) {
                    return response.status(500).send('Error deleting product');
                }
                response.json('Deleted successfully');
            });
        });



        app.delete('/api/webshop/DeleteProduct', async (req, res) => {
            try {
              const result = await Product.deleteOne({ id: req.query.id });
      
              if (result.deletedCount === 0) {
                return res.status(404).send('Product not found');
              }
      
              res.json('Deleted successfully');
            } catch (error) {
              console.error('Error deleting product:', error);
              res.status(500).send('Error deleting product');
            }
          });




        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

startApp();