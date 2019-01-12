const routes = require('express').Router();
const bodyParser = require('body-parser');
const { pool } = require('./mysql');

routes.use(bodyParser.json());

/**
 * Get method to read data from mySQL db
 */
routes.get('/food', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query('SELECT * FROM food_menu ORDER BY _id DESC', (err, results) => {
      connection.release();
      if(err) {
        res.status(400).send({status: 'FAILURE', message: err});
      }
      res.status(200).send(results);
    });
  });
});
/**
 * Post method to insert data into mySQL db
 */
routes.post('/food', (req, res) => {
  if(req.body === {}) {
    res.status(400).send({status: 'FAILURE', message: 'Invalid request.'});
  }
  const { name, course, category, cuisines, price, status} = req.body;
  pool.getConnection((err, connection) => {
    connection.query('INSERT INTO food_menu SET ?', { name, course, category, cuisines, price, status}, (err, results) => {
      connection.release();
      if(err) {
        res.status(400).send({status: 'FAILURE', message: err});
      }
      res.status(200).send(results);
    });
  });
});
/**
 * Patch method to update any record in mySQL db
 */
routes.patch('/food', (req, res) => {
  if(req.body === {}) {
    res.status(400).send({status: 'FAILURE', message: 'Invalid request.'});
  }
  const {_id, name, course, category, cuisines, price, status} = req.body;
  pool.getConnection((err, connection) => {
    connection.query('UPDATE food_menu SET name=?, course=?, category=?, cuisines=?, price=?, status=? WHERE _id = ?', 
    [name, course, category, cuisines, price, status, _id], 
    (err, results) => {
      connection.release();
      if(err) {
        res.status(400).send({status: 'FAILURE', message: err});
      }
      res.status(200).send(results);
    });
  });
});
/**
 * Delete method to delete particular row in mySQL db
 */
routes.delete('/food/:id', (req, res) => {
  pool.getConnection((err, connection) => {
    connection.query(`DELETE FROM food_menu WHERE _id = ?`, req.params.id, (err, results) => {
      connection.release();
      if(err) {
        res.status(400).send({status: 'FAILURE', message: err});
      }
      res.status(200).send(results);
    });
  });
});

module.exports = routes;