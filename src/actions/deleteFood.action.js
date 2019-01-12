import service from './../services/rest-api.service';
import { retrieveFood } from './retrieveFood.action';

export const deleteFood = (id) => {
  return (dispatch) => {
    dispatch({type: 'LOADING', status: true});
    service.deleteFood(id)
    .then(res => {
      dispatch(retrieveFood());
    })
    .catch(err => {
      const data = {open: true, category: 'error', message: err.message};
      dispatch({type: 'OPEN_NOTIFICATION', data});
      dispatch({type: 'LOADING', status: false});
    });
  }
}
