import React from 'react';
import { shallow } from 'enzyme';
import Home from '../src/components/Home';
describe("Home", () => {
  it("should render Home", () => {
    const wrapper = shallow(<Home />);
  });
});