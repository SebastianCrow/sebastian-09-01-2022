import React from 'react';
import { Table } from '../table.component';
import { create } from 'react-test-renderer';
import { Loader } from '../../loader/loader.component';

describe('table.component', () => {
  test('renders loader without data', () => {
    const renderer = create(
      <Table columns={[{ key: 'test', title: 'Key' }]} />
    );
    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(Loader)).toHaveLength(1);
  });

  test('renders column', () => {
    const renderer = create(
      <Table
        columns={[{ key: 'testColumn', title: 'Test Column' }]}
        data={[
          { id: 'testRow', cells: { testColumn: { value: 'Test Cell' } } },
        ]}
      />
    );
    expect(renderer.toJSON()).toMatchSnapshot();
    expect(renderer.root.findAllByType(Loader)).toHaveLength(0);
  });

  // TODO: More specific tests for values in the table
});
