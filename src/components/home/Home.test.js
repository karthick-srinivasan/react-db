import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Home component', () => {
  it('Should render without crashing', () => {
    const component = shallow(<Home />);
    expect(component).toMatchSnapshot();
  });

  it('Should state have mongo value by default', () => {
    const wrapper = shallow(<Home />).dive();
    const selectedDb = wrapper.state().value;
    expect(selectedDb).toEqual('mongo');
  });

  it('State should be updated when mySQL radio button is clicked', () => {
    const mockedEvent = { target: { value: 'mysql' } };
    const wrapper = shallow(<Home />).dive();
    const mysqlRadio = wrapper.find('#mysql');
    mysqlRadio.simulate('change', mockedEvent);
    expect(wrapper.state().value).toEqual('mysql');
  })
});
