import React from 'react';
import { Text } from '../text.component';
import { create } from 'react-test-renderer';

describe('text.component', () => {
  test('renders', () => {
    const renderer = create(<Text>Test</Text>);
    expect(renderer.toJSON()).toMatchSnapshot();
  });
});
