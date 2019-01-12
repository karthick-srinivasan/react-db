import React from 'react';
import { shallow } from 'enzyme';
import FoodList from './FoodList';
import { combineReducers } from 'redux';
import food from './../../reducers/food.reducer';
import loader from './../../reducers/food.reducer';
import notification from './../../reducers/food.reducer';
import form from './../../reducers/food.reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const reducer = combineReducers({
  food,
  loader,
  notification,
  form
});

const store = createStore(
  reducer, 
  applyMiddleware(thunk)
);

const getComponent = () => {
  return shallow(<FoodList />, { context: { store } })
          .dive()
          .dive();
}

describe('Food List component', () => {

  it('Should render without crashing', () => {
    const component = shallow(<FoodList />, { context: { store } });
    expect(component).toMatchSnapshot();
  });

  it('Should call opendialouge function when add button is clicked', () => {
    const component = getComponent();
    const spy = jest.spyOn(component.instance(), 'openFormDialogue'); 
    component.instance().forceUpdate();
    component.update();       
    const addBtn = component.find('#add');
    addBtn.prop('onClick')();
    expect(spy).toHaveBeenCalled();
  });

  // it('Should call edit function when edit button is clicked on any row', () => {
  //   const rows = [{
  //     _id: 1,
  //     name: 'Ice cream',
  //     course: 'Dessert',
  //     cuisines: 'Italian',
  //     category: 'Veg',
  //     price: 50,
  //     status: true
  //   }];
  //   const component = shallow(<FoodList rows={rows} isLoading="false"/>, { context: { store } }).dive().dive();
  //   const spy = jest.spyOn(component.instance(), 'edit'); 
  //   component.instance().forceUpdate();
  //   component.update();       
  //   const editBtn = component.find('#edit1');
  //   editBtn.prop('onClick')();
  //   expect(spy).toBeCalledWith(rows[0]);
  // });
});