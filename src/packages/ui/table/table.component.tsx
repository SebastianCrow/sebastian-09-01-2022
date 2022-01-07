import React, { FunctionComponent } from 'react';
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { ColumnInfo, RowHighlightInfo, RowInfo } from './table.types';
import { TEXT_ALIGNMENT } from './table.defaults';

// TODO: Forbid using '@mui/material' directly outside of the ui package

const computeBackgroundBar = ({
  direction,
  color,
  percent,
}: RowHighlightInfo): string => {
  return `linear-gradient(${
    direction === 'left' ? 'to left' : 'to right'
  }, ${color} 0 ${percent}%, transparent ${percent}% 100%)`;
};

export interface TableProps {
  columns: ColumnInfo[];
  data: RowInfo[];
}

export const Table: FunctionComponent<TableProps> = ({ columns, data }) => {
  return (
    <TableContainer>
      <MuiTable size="small">
        <TableHead>
          {/* TODO: sx or style? */}
          <TableRow>
            {columns.map(({ key, title, textAlignment = TEXT_ALIGNMENT }) => (
              <TableCell key={key} align={textAlignment}>
                {/* TODO: Wrap title with <Text /> if it's not a custom component */}
                {title}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, highlight, cells }) => {
            // TODO: sx or style?
            return (
              <TableRow
                key={id}
                sx={
                  highlight
                    ? {
                        background: computeBackgroundBar(highlight),
                      }
                    : undefined
                }
              >
                {columns.map(({ key }) => {
                  const { value, textAlignment = TEXT_ALIGNMENT } = cells[key]; // TODO: Throw if missing? ErrorBoundary?
                  return (
                    <TableCell key={key} align={textAlignment}>
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
