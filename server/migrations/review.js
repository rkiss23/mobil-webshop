const Review = require('../models/review');
const mongoose = require('mongoose');


const reviewsArray = [
  {
    product: new mongoose.Types.ObjectId('648a70bf3f4b4b7a2d7f8a67'),
    user: new mongoose.Types.ObjectId('648a6f6b3f4b4b7a2d7f8a66'),
    rating: 5,
    comment: 'Great product!'
  }
];

async function createAndSaveReview() {
  try {
    for (const reviewData of reviewsArray) {
      const existingReview = await Review.findOne({
        product: reviewData.product,
        user: reviewData.user
      });
      if (existingReview) {
        console.log(`Review by user "${reviewData.user}" for product "${reviewData.product}" already exists, not inserting again.`);
        continue;
      }
      const newReview = new Review(reviewData);
      await newReview.save();
      console.log(`Review by user "${reviewData.user}" saved!`);
    }
  } catch (err) {
    console.error('Error saving review:', err);
  }
}

module.exports = createAndSaveReview;