const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuidv1');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxLenght: 32
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  hashed_password: {
    type: String,
    required: true,
  },
  about: {
    type: String,
    trim: true
  },
  salt: String,
  role: {
    type: Number,
    default: 0
  },
  history: {
    type: Array,
    default: []
  }
},
{
  timestamps: true
}
)