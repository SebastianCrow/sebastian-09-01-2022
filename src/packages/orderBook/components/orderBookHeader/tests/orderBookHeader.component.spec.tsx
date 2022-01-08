import React from 'react';
import { act, ReactTestRenderer } from 'react-test-renderer';
import { OrderBookHeader } from '../orderBookHeader.component';
import { Text } from '../../../../ui/text/text.component';
import { SpreadHeader } from '../../spreadHeader/spreadHeader.component';
import { createRendererWithOrderBookStore } from '../../../tests/utils/createRendererWithOrderBookStore.util';
import { findByDataTestId } from '../../../../../tests/utils/findByDataTestId.util';

describe('orderBookHeader.component', () => {
  let renderer: ReactTestRenderer;

  test('renders', () => {
    act(() => {
      renderer = createRendererWithOrderBookStore(<OrderBookHeader />);
    });

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(Text)).toHaveLength(1);
    expect(findByDataTestId(renderer.root, 'title')).toBeTruthy();
    expect(renderer.root.findAllByType(SpreadHeader)).toHaveLength(1);
  });

  // TODO: Some kind of visual testing to check media queries (`mobile` and `desktop` classes).
  // E.g. <SpreadHeader /> wrapped in <OrderBookHeader />
});
