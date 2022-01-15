import React from 'react';
import { Loader } from '../loader.component';
import { create } from 'react-test-renderer';

describe('loader.component', () => {
  test('renders', () => {
    const renderer = create(<Loader />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
