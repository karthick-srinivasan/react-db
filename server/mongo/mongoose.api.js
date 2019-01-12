const express = require('express');
const db = require('./mongoose');
const bodyParser = require('body-parser');
const routes = express.Router();

routes.use(bodyParser.json());
/**
 * Get method to fetch the food list from mongodb
 */
routes.get('/food', (req, res) => {
  db.find({})
    .sort({_id: -1})
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(400).send({status: 'FAILURE', message: err});
    });
});
/**
 * Get method to create a new food from mongodb
 */
routes.post('/food', (req, res) => {
  const request = req.body;
  if(request === {})
    res.status(400).send({status: 'FAILURE', message: 'Invalid request.'});
  
  const newFood = new db({
    name: request.name,
    course: request.course,
    category: request.category,
    cuisines: request.cuisines,
    price: request.price,
    status: request.status
  });
  
  newFood.save()
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(400).send({status: 'FAILURE', message: err});
    });
});
/**
 * Patch method to update the food item in mongodb
 */
routes.patch('/food', (req, res) => {
  const request = req.body;
  if(request === {})
    res.status(400).send({status: 'FAILURE', message: 'Invalid request.'});
  db.updateOne(
    { '_id': request._id },
    { $set: {
      name: request.name,
      course: request.course,
      category: request.category,
      cuisines: request.cuisines,
      price: request.price,
      status: request.status
    }}
  )
  .then((doc) => {
    res.status(200).send(doc);
  })
  .catch((err) => {
    res.status(400).send({status: 'FAILURE', message: err});
  });
});
/**
 * Delete method to delete a particular food item
 */
routes.delete('/food/:id', (req, res) => {
  db.deleteOne({'_id': req.params.id})
    .then((doc) => {
      res.status(200).send(doc);
    })
    .catch((err) => {
      res.status(400).send({status: 'FAILURE', message: err});
    });
});

module.exports = routes;