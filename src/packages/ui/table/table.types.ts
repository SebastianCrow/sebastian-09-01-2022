import { CSSProperties, ReactNode } from 'react';

export interface ColumnInfo {
  key: string;
  title: ReactNode;
  textAlignment?: TextAlignment;
  cellStyle?: CSSProperties;
}

export interface RowInfo {
  id: string;
  rowClass?: string;
  rowStyle?: CSSProperties;
  cells: Record<string, CellInfo>;
}

interface CellInfo {
  value: ReactNode;
  textAlignment?: TextAlignment;
  cellStyle?: CSSProperties;
}

export type TextAlignment = 'left' | 'right';

export interface TableInfo {
  headerVisible?: boolean;
  tableClass?: string;
}
