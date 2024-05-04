const Review = require('../models/review');

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.send(reviews);
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).send('Error fetching reviews');
  }
};

const addReview = async (req, res) => {
  try {
    const { product, user, rating, comment, date } = req.body;
    const newReview = new Review({
      product,
      user,
      rating,
      comment,
      date
    });
    await newReview.save();
    res.json('Review added successfully');
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).send('Error adding review');
  }
};

const updateReview = async (req, res) => {
  try {
    const { id, product, user, rating, comment, date } = req.body;

    const review = await Review.findOne({ _id: id });

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    review.product = product;
    review.user = user;
    review.rating = rating;
    review.comment = comment;
    review.date = date;

    await review.save();

    res.json('Review updated successfully');
  } catch (error) {
    console.error('Error updating review:', error);
    res.status(500).json({ message: 'Error updating review' });
  }
};

const deleteReview = async (req, res) => {
  try {
    const result = await Review.deleteOne({ _id: req.query.id });

    if (result.deletedCount === 0) {
      return res.status(404).send('Review not found');
    }

    res.json('Deleted successfully');
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).send('Error deleting review');
  }
};

module.exports = { 
    getReviews,
    addReview,
    updateReview,
    deleteReview
};
