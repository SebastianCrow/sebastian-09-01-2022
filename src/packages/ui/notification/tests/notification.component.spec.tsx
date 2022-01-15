import React from 'react';
import { Notification } from '../notification.component';
import { FormattedMessage } from 'react-intl';
import { createRendererWithStore } from '../../../../tests/utils/createRendererWithStore.util';
import { getOrderBookMockStore } from '../../../../tests/mocks/getOrderBookMockStore';

describe('notification.component', () => {
  test('renders opened notification', () => {
    const renderer = createRendererWithStore(
      <Notification open message="Order Book" />,
      getOrderBookMockStore()
    );

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(FormattedMessage)).toHaveLength(1);
    expect(renderer.root.findByType(FormattedMessage).props.id).toStrictEqual(
      'Order Book'
    );
  });

  test('does not render closed notification', () => {
    const renderer = createRendererWithStore(
      <Notification open={false} message="Order Book" />,
      getOrderBookMockStore()
    );

    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(FormattedMessage)).toHaveLength(0);
  });
});
