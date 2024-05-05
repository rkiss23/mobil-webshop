const Product = require('../models/product');


const productsArray = [
    {
      id: '1',
      title: 'iPhone 15 Pro Max 1TB',
      description: 'A17 Pro chip Fantasztikus teljesítményével újraírja a játékszabályokat.',
      price: 749990,
      image: 'iphone_15_pro.jpg'
    },
    {
      id: '2',
      title: 'iPhone 15 128GB',
      description: 'Anyagában színezett üveg Masszív és megkapó dizájn.',
      price: 329990,
      image: 'iphone_15.jpg'
    },
    {
      id: '3',
      title: 'iPhone 14 Pro Max 512GB',
      description: 'Super Retina XDR‑kijelző',
      price: 549990,
      image: 'iphone_14_pro.jpg'
    },
    {
      id: '4',
      title: 'iPhone 14 256GB',
      description: 'Ütközésészlelés funkció. Minden eddi­ginél hosszabb aksiüzem­idő.',
      price: 449990,
      image: 'iphone_14.jpg'
    },
    {
      id: '5',
      title: 'iPhone 13 128GB',
      description: 'Strapabíró kialakítású, szuperfényes kijelző.',
      price: 239990,
      image: 'iphone_13.jpg'
    },
    {
      id: '6',
      title: 'iPhone 12 128GB',
      description: '5G-vel hasít. Az A14 Bionic, a leggyorsabb okostelefonchip hajtja. ',
      price: 234990,
      image: 'iphone_12.jpg'
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