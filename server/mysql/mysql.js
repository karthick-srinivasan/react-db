const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 1,
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'reactdb'
});

pool.on('acquire', (connection) => {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('connection', (connection) => {
  connection.query('Connection %d created', connection.threadId);
});

pool.on('release', (connection) => {
  console.log('Connection %d released', connection.threadId);
});

module.exports = { pool };