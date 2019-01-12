import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { combineReducers } from 'redux';
import food from './reducers/food.reducer';
import loader from './reducers/food.reducer';
import notification from './reducers/food.reducer';
import form from './reducers/food.reducer';
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
)

describe('App component', () => {
  it('renders without crashing', () => {
    const component = shallow(<App />, { context: { store } });
    expect(component).toMatchSnapshot();
  });
});

