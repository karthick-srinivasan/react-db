const express = require('express');
const cors = require('cors');
const path = require('path');
require('./config/config');
const mongoApi = require('./mongo/mongoose.api');
const mysqlApi = require('./mysql/mysql.api');
const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(express.static(path.join(__dirname, './../build')));

//MogoDB routes
app.use('/mongo', mongoApi);
//MySQL routes
app.use('/mysql', mysqlApi);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening to the port ${PORT}`);
});