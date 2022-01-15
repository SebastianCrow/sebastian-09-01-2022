import React from 'react';
import { Button } from '../button.component';
import { create } from 'react-test-renderer';

describe('button.component', () => {
  test('renders', () => {
    const renderer = create(<Button />);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
