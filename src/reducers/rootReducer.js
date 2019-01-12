import { combineReducers } from 'redux';
import food from './food.reducer';
import loader from './loader.reducer';
import notification from './notification.reducer';
import form from './form.reducer'
//Root reducer
export default combineReducers({
  food,
  loader,
  notification,
  form
});