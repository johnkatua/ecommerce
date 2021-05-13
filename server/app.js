const express = require('express');
require('dotenv').config();

const app = express();

app.get('/', (req, res) => {
  res.send('Hello from node');
});

const port = process.env.PORT || 8001;

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
})