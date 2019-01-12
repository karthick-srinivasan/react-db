/**
 * File to generate the service api based on DB selection
 */
import constants from './../constant';

const selectedDB = sessionStorage.getItem('db');

export const api = selectedDB === 'mongo'? 
    constants.MONGO_API: 
    constants.MYSQL_API;