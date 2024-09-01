const mongoose = require('mongoose');
require('dotenv').config();
// Custom validator for the price property to ensure it's positive
const validatePrice = (value) => {
  return value > 0;
};

// Define the schema for the Book model
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true // Removes leading and trailing whitespace
  },
  author: {
    type: String,
    required: true,
    trim: true // Removes leading and trailing whitespace
  },
  publishYear: {
    type: Number,
    required: true,
    min: [0, 'Publish year must be a positive number'] // Minimum value of 0
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price must be at least 0'],
    validate: {
      validator: validatePrice,
      message: 'Price must be a positive number'
    }
  }
}, {
  timestamps: true // Automatically creates `createdAt` and `updatedAt` fields
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
