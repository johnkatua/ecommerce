const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLenght: 32
  },
  description: {
    type: String,
    required: true,
    maxLenght: 200
  },
  price: {
    type: Number,
    trim: true,
    required: true,
    maxLenght: 32
  },
  category: {
    type: ObjectId,
    ref: 'Category',
    required: true,
  },
  quantity: {
    type: Number,
  },
  photo: {
    data: Buffer,
    contentType: String,
  },
  shipping: {
    required: false,
    type: Boolean
  }
},
{
  timestamps: true
}
);

module.exports = mongoose.model('Product', productSchema);