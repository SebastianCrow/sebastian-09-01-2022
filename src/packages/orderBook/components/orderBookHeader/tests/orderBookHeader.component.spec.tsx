import React from 'react';
import { OrderBookHeader } from '../orderBookHeader.component';
import { SpreadHeader } from '../../spreadHeader/spreadHeader.component';
import { createRendererWithOrderBookStore } from '../../../tests/utils/createRendererWithOrderBookStore.util';
import { findByDataTestId } from '../../../../../tests/utils/findByDataTestId.util';

describe('orderBookHeader.component', () => {
  test('renders', () => {
    const renderer = createRendererWithOrderBookStore(<OrderBookHeader />);

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(findByDataTestId(renderer.root, 'title')).toBeTruthy();
    // TODO: Visual testing checking media queries (`mobile` and `desktop` classes) to check <SpreadHeader /> display
    expect(renderer.root.findAllByType(SpreadHeader)).toHaveLength(1);
  });
});
