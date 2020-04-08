/* eslint-disable react/jsx-filename-extension */ // Test files have react components and are .js so this rule doesn't apply
import React from 'react';
import { shallow } from 'enzyme';

// App imports
import Main from '@components/Main';

describe('App loads', () => {
  it('renders without crashing', () => {
    shallow(<Main />);
  });
});
