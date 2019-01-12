import service from './../services/rest-api.service';

export const retrieveFood = () => {
  
  return (dispatch) => {
    dispatch({type: 'LOADING', status: true});
    service.getFood()
      .then(res => {
        const data = {open: true, category: 'success', message: 'DB is in sync!'};
        dispatch({type: 'GET_FOOD', payLoad: res.data});
        dispatch({type: 'LOADING', status: false});
        dispatch({type: 'OPEN_NOTIFICATION', data});
      })
      .catch(err => {
        const data = {open: true, category: 'error', message: err.message};
        dispatch({type: 'OPEN_NOTIFICATION', data});
        dispatch({type: 'LOADING', status: false});
      });
  }
}