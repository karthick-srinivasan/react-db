const mongoose = require('mongoose');
require('./../config/config');

/**
 * Connect Mongodb with connect()
 */
mongoose
.connect(process.env.MONGO_URL, { useNewUrlParser: true })
.then(() => {
  console.log('Mongo database connection successful');
})
.catch((err) => {
  console.log('Mongo database connection error: ', err);
});

/**
 * Creating a schema
 */
const schema = new mongoose.Schema({
  name: String,
  course: String,
  category: String,
  cuisines: String,
  price: String,
  status: Boolean
});

module.exports = mongoose.model('food_menu', schema);