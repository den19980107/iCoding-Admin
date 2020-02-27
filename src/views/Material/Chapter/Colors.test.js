import React from 'react';
import Colors from './Chapter';
import { mount } from 'enzyme'

it('renders without crashing', () => {
  mount(<Colors />);
});
