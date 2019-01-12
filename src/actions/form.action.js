import service from './../services/rest-api.service';
import { retrieveFood } from './retrieveFood.action';

//Action to open form modal
export const openFormDialogue = () => {
  return (dispatch) => {
    dispatch({type: 'OPEN_FORM', status: true, data: []});
  }
}

//Action to close form modal
export const closeFormDialogue = () => {
  return (dispatch) => {
    dispatch({type: 'LOADING', status: true});
    dispatch({type: 'OPEN_FORM', status: false});
    dispatch({type: 'LOADING', status: false});
  }
}

//Action to open edit form modal
export const editFormDialogue = (data) => {
  return (dispatch) => {
    dispatch({type: 'OPEN_FORM', status: true, data});
  }
}

//Action to save form data
export const saveFood = (input, method) => {
  return (dispatch) => {
    dispatch({type: 'LOADING', status: true});
    const promise = method === 'post'? service.createFood(input): service.updateFood(input);
    promise
    .then(res => {
      dispatch({type: 'OPEN_FORM', status: false});
      dispatch(retrieveFood());
    })
    .catch(err => {
      const data = {open: true, category: 'error', message: err.message};
      dispatch({type: 'OPEN_NOTIFICATION', data});
      dispatch({type: 'LOADING', status: false});
    });
  }
}
