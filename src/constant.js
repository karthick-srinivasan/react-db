/**
 * Declaring gobal constants
 */
let MONGO_API, MYSQL_API;
if(process.env.NODE_ENV === 'development') {
  MONGO_API = 'http://localhost:3232/mongo';
  MYSQL_API = 'http://localhost:3232/mysql';
} else if(process.env.NODE_ENV === 'production') {
  MONGO_API = 'http://localhost:3232/mongo';
  MYSQL_API = 'http://localhost:3232/mysql';
}

const constants = {
  MONGO_API,
  MYSQL_API
}

export default constants;