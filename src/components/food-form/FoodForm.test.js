import React from 'react';
import { shallow } from 'enzyme';
import FoodForm from './FoodForm';
import { combineReducers } from 'redux';
import food from './../../reducers/food.reducer';
import loader from './../../reducers/food.reducer';
import notification from './../../reducers/food.reducer';
import form from './../../reducers/food.reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//combining reducers
const reducer = combineReducers({
  food,
  loader,
  notification,
  form
});

//creating store
const store = createStore(
  reducer, 
  applyMiddleware(thunk)
)

describe('Food Form component', () => {

  it('Should render without crashing', () => {
    const component = shallow(<FoodForm />, { context: { store } });
    expect(component).toMatchSnapshot();
  });

  it('Should return false if the fields are empty', () => {
    const component = shallow(<FoodForm />, { context: { store } });
    const status = component.dive().dive().instance().handleValidation();
    expect(status).toBe(false);
  });

  it('Should return true if the fields are not empty', () => {
    const component = shallow(<FoodForm />, { context: { store } });
    const wrapper = component.dive().dive().instance();
    wrapper.setState({
      name: 'Ice cream',
      course: 'Dessert',
      cuisines: 'Italian',
      category: 'Veg',
      price: 50,
      status: true,
      _id: null
    });
    const status = wrapper.handleValidation();
    expect(status).toBe(true);
  });

  it('Should call save function when the form is submitted', () => {
    const component = shallow(<FoodForm />, { context: { store } });
    const foodform = component.dive().dive();
    const spy = jest.spyOn(foodform.instance(), 'save');
    const save = foodform.find('form');
    foodform.instance().forceUpdate();
    foodform.update();
    save.simulate('submit', { preventDefault () {} });
    expect(spy).toHaveBeenCalled();
  });  
});