import axios from 'axios';

axios.defaults.headers.common['Cache-Control'] = 'no-cache';
axios.defaults.headers.common['Pragma'] = 'no-cache';
axios.defaults.headers.common['If-Modified-Since'] = 'Mon, 26 Jul 1997 05: 00: 00 GMT';

const service = {
  //function to get data from a selected db
  getFood: () => {  
    const { api } = require('./../config/api.config');
    return new Promise((resolve, reject) => {
      axios.get(`${api}/food`)
        .then(res => resolve(res))
        .catch(err => reject(err))
    });
  },
  //function to create new data in a selected db
  createFood: payload => {
    const { api } = require('./../config/api.config');
    return new Promise((resolve, reject) => {
      axios.post(`${api}/food`, payload)
        .then(res => resolve(res))
        .catch(err => reject(err))
    });
  },
  //function to update particular data in a selected db
  updateFood: payload => {
    const { api } = require('./../config/api.config');
    return new Promise((resolve, reject) => {
      axios.patch(`${api}/food`, payload)
        .then(res => resolve(res))
        .catch(err => reject(err))
    });
  },
  //function to delete data from a selected db
  deleteFood: id => {
    const { api } = require('./../config/api.config');
    return new Promise((resolve, reject) => {
      axios.delete(`${api}/food/${id}`)
        .then(res => resolve(res))
        .catch(err => reject(err))
    });
  },
}

export default service;