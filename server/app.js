const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// import routes
const userRoutes = require('./routes/user');


// app
const app = express();

// db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
}).then(() => {
  console.log('mongodb connected');
});

// routes middleware
app.use('/api', userRoutes);

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})