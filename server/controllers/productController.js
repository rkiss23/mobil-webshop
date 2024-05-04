const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.send(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Error fetching products');
    }
  };


  const addProduct = async (req, res) => {
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
}

const updateProduct =  async (req, res) => {
    try {
      const { id, title, description, price, image } = req.body;
  
      if (!id || !title || !description || !price || !image) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
  
      const product = await Product.findOne({ id });
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      product.title = title;
      product.description = description;
      product.price = price;
      product.image = image;

      await product.save();
  
      res.json('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Error updating product' });
    }
  }

const deleteProduct = async (req, res) => {
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
  }

  
  module.exports = { 
    getProducts,
    addProduct,
    updateProduct,
    deleteProduct
};