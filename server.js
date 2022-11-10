// require express and mongoose
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// connect mongoose to mongodb
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pizza-hunt',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// log mongo queries
mongoose.set('debug', true);

// require routes 
app.use(require('./routes'));

// connect to server
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));