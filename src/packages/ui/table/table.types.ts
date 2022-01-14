import { CSSProperties, ReactNode } from 'react';

export interface ColumnInfo {
  key: string;
  title: ReactNode;
  textAlignment?: TextAlignment;
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
}

export type TextAlignment = 'left' | 'right';

export interface TableInfo {
  headerVisible?: boolean;
}
