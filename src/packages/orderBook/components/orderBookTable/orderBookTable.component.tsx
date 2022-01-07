import React, { FunctionComponent } from 'react';
import { Table } from '../../../ui/table/table.component';
import { useComputeOrderBookTableData } from '../../hooks/useComputeOrderBookTableData.hook';
import { ComputedPriceInfo, PriceDataType } from '../../state/orderBook.types';

interface OrderBookTableProps {
  priceInfoList: ComputedPriceInfo[];
  priceDataType: PriceDataType;
}

export const OrderBookTable: FunctionComponent<OrderBookTableProps> = ({
  priceInfoList,
  priceDataType,
}) => {
  const { columns, data, options } = useComputeOrderBookTableData({
    priceInfoList,
    priceDataType,
  });
  return <Table columns={columns} data={data} options={options} />;
};
