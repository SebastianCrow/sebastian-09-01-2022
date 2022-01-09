import React, { FunctionComponent, useMemo } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ColumnInfo, RowInfo, TableInfo } from './table.types';
import { TEXT_ALIGNMENT } from './table.defaults';
import styles from './table.component.module.scss';
import { Loader } from '../loader/loader.component';
import cns from 'classnames';

// TODO: Forbid using `@mui/material` directly outside of the `ui` package with ESLint

export interface TableProps {
  columns: ColumnInfo[];
  data?: RowInfo[];
  options?: TableInfo;
}

export const Table: FunctionComponent<TableProps> = ({
  columns,
  data,
  options: { headerVisible = true, tableClass } = {},
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
    <TableContainer>
      <MuiTable size="small" className={tableClass}>
        <colgroup>
          {columns.map(({ key }) => (
            <col key={key} style={{ width: colWidth }} />
          ))}
        </colgroup>
        {headerVisible && (
          <TableHead>
            <TableRow className={styles.rowHeader}>
              {columns.map(
                ({ key, title, textAlignment = TEXT_ALIGNMENT, cellStyle }) => (
                  <TableCell
                    key={key}
                    align={textAlignment}
                    className={styles.cell}
                    style={cellStyle}
                  >
                    {/* TODO: Wrap title with <Text /> if it's not a custom component */}
                    {title}
                  </TableCell>
                )
              )}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map(({ id, rowClass, rowStyle, cells }) => (
            <TableRow
              key={id}
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
                const {
                  value,
                  textAlignment = TEXT_ALIGNMENT,
                  cellStyle,
                } = cell;
                return (
                  <TableCell
                    key={key}
                    align={textAlignment}
                    className={styles.cell}
                    style={cellStyle}
                  >
                    {/* TODO: Wrap value with <Text /> if it's not a custom component */}
                    {value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
