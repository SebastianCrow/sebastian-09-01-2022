import React, { FunctionComponent } from 'react';
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

// TODO: Forbid using '@mui/material' directly outside of the ui package

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
  if (!data) {
    return (
      <div className={styles.loadingOverlay}>
        <Loader />
      </div>
    );
  }
  return (
    <TableContainer>
      <MuiTable size="small">
        <colgroup>
          {columns.map(({ key }) => (
            <col key={key} style={{ width: `${100 / columns.length}%` }} />
          ))}
        </colgroup>
        {headerVisible && (
          <TableHead>
            <TableRow className={styles.rowHeader}>
              {columns.map(({ key, title, textAlignment = TEXT_ALIGNMENT }) => (
                <TableCell
                  key={key}
                  align={textAlignment}
                  className={styles.cell}
                >
                  {/* TODO: Wrap title with <Text /> if it's not a custom component */}
                  {title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {data.map(({ id, rowStyle, cells }) => {
            // TODO: sx or style?
            return (
              <TableRow key={id} className={styles.rowData} style={rowStyle}>
                {columns.map(({ key }) => {
                  const { value, textAlignment = TEXT_ALIGNMENT } = cells[key]; // TODO: Throw if missing? ErrorBoundary?
                  return (
                    <TableCell
                      key={key}
                      align={textAlignment}
                      className={styles.cell}
                    >
                      {/* TODO: Wrap value with <Text /> if it's not a custom component */}
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};
