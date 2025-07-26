const mongoose = require('mongoose');

const connectToDb = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/bookstore');
    console.log("database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database", error);
  }
};

// Define the Book schema 
const BookSchema = new mongoose.Schema({ 
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  stockQuantity: {
    type: Number,
    default: 0
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  authors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  }]
});

// Export the model
const Bookmodel = mongoose.model('BookData', BookSchema);
module.exports = {connectToDb, Bookmodel};