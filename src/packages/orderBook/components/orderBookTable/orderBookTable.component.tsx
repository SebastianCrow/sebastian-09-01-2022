import React, { FunctionComponent } from 'react';
import { Table, TableProps } from '../../../ui/table/table.component';
import { Text } from '../../../ui/text/text.component';

const TODO_TABLE_DATA: TableProps = {
  columns: [
    {
      key: 'price',
      title: <Text variant="secondary">Price</Text>,
    },
    {
      key: 'size',
      title: <Text variant="secondary">Size</Text>,
    },
    {
      key: 'total',
      title: <Text variant="secondary">Total</Text>,
    },
  ],
  data: [
    {
      id: '0',
      cells: {
        price: {
          value: <Text variant="success">34079.5</Text>,
        },
        size: {
          value: <Text>3356</Text>,
        },
        total: {
          value: <Text>3356</Text>,
        },
      },
    },
    {
      id: '1',
      cells: {
        price: {
          value: <Text variant="danger">34080</Text>,
        },
        size: {
          value: <Text>23999</Text>,
        },
        total: {
          value: <Text>27355</Text>,
        },
      },
    },
  ],
};

export const OrderBookTable: FunctionComponent = () => {
  return (
    <Table columns={TODO_TABLE_DATA.columns} data={TODO_TABLE_DATA.data} />
  );
};
