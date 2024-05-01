const Express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const multer = require('multer');

const app = Express();
app.use(cors());

const CONNECTION_STRING = "mongodb+srv://kissrobert2399:vtTtsJWA1HXUdOn5@cluster0.rsfm8av.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const DATABASENAME = "webshop";
let database;

// Create an async function to connect to the database
async function startApp() {
    try {
        const client = await MongoClient.connect(CONNECTION_STRING);
        database = client.db(DATABASENAME);
        console.log('Connected to database');


        app.get('/api/webshop/GetProducts', async (request, response) => {
            try {
                console.log('Fetching products...');
                const products = await database.collection('webshopcollection').find({}).toArray();
                response.send(products)
            } catch (error) {
                console.error('Error fetching products:', error);
                response.status(500).send('Error fetching products');
            }
        });

        app.post('/api/webshop/AddProduct', multer().none(), (request, response) => {
            database.collection('webshopcollection').countDocuments({}, (error, numOfDocs) => {
                if (error) {
                    return response.status(500).send('Error counting documents');
                }
                database.collection('webshopcollection').insertOne({
                    id: (numOfDocs + 1).toString(),
                    description: request.body.productName
                }, (err) => {
                    if (err) {
                        return response.status(500).send('Error adding product');
                    }
                    response.json('Added successfully');
                });
            });
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

        // Start the server only after routes are defined
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

// Start the app by calling the async function
startApp();