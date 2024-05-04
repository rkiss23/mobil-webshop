const Product = require('../models/product');


const productsArray = [
    {
      id: '1',
      title: 'Sample Product 1',
      description: 'This is a sample product description 1',
      price: 20000,
      image: 'iphone_15.jpg'
    },
    {
      id: '2',
      title: 'Sample Product 2',
      description: 'This is a sample product description 2',
      price: 25000,
      image: 'iphone_15.jpg'
    },
  ];

async function createAndSaveProduct() {
  try {


    for (const productData of productsArray) {
        const existingProduct = await Product.findOne({
          id: productData.id,
        });
  
        if (existingProduct) {
          console.log(`Product "${productData.title}" already exists, not inserting again.`);
          continue;
        }
  
        const newProduct = new Product(productData);
        await newProduct.save();
        console.log(`Product "${productData.title}" saved!`);
      }
      
  } catch (err) {
    console.error('Error saving product:', err);
  }
}

module.exports = createAndSaveProduct;