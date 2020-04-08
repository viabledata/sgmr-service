/* eslint-disable react/jsx-filename-extension */ // Test files have react components and are .js so this rule doesn't apply
// Test setup

import React from 'react';
import { shallow } from 'enzyme';

// App imports
import Main from '@components/Main';

describe('First React component test with Enzyme', () => {
  it('renders without crashing', () => {
    shallow(<Main />);
  });
});
