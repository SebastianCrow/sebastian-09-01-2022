import React, { FunctionComponent, useMemo } from 'react';
import cns from 'classnames';
import { ColumnInfo, RowInfo, TableInfo } from './table.types';
import { TEXT_ALIGNMENT } from './table.defaults';
import styles from './table.component.module.scss';
import { Loader } from '../loader/loader.component';

export interface TableProps {
  columns: ColumnInfo[];
  data?: RowInfo[];
  options?: TableInfo;
}

export const Table: FunctionComponent<TableProps> = ({
  columns,
  data,
  options: { headerVisible = true } = {},
}) => {
  if (columns.length === 0) {
    throw new Error('There needs to be at least one column definition');
  }
  const colWidth = useMemo(() => `${100 / columns.length}%`, [columns.length]);
  if (!data) {
    return (
      <div className={styles.loadingOverlay}>
        <Loader />
      </div>
    );
  }
  return (
    <div>
      {headerVisible && (
        <div className={styles.rowHeader}>
          {columns.map(({ key, title, textAlignment = TEXT_ALIGNMENT }) => (
            <div
              key={key}
              className={cns(styles.cell, {
                [styles.alignRight]: textAlignment === 'right',
              })}
              style={{ width: colWidth }}
            >
              {title}
            </div>
          ))}
        </div>
      )}
      {data.map(({ id, rowClass, rowStyle, cells }, index) => (
        <div
          key={`${id}_${index}`}
          className={cns(styles.rowData, rowClass)}
          style={rowStyle}
        >
          {columns.map(({ key }) => {
            const cell = cells[key];
            if (!cell) {
              throw new Error(
                `Cell info for data id=[${id}] and column key=[${key}] not found`
              );
            }
            const { value, textAlignment = TEXT_ALIGNMENT } = cell;
            return (
              <div
                key={key}
                className={cns(styles.cell, {
                  [styles.alignRight]: textAlignment === 'right',
                })}
                style={{ width: colWidth }}
              >
                {/* TODO: Wrap value with <Text /> if it's not a custom component */}
                {value}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
