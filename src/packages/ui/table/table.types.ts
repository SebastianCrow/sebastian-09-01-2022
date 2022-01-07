import { CSSProperties, ReactNode } from 'react';

export interface ColumnInfo {
  key: string;
  title: ReactNode;
  textAlignment?: TextAlignment;
}

export interface RowInfo {
  id: string; // TODO: How to make it better?
  rowStyle?: CSSProperties;
  cells: Record<string, CellInfo>; // TODO: Type safety with generics?
}

interface CellInfo {
  value: ReactNode;
  textAlignment?: TextAlignment;
}

export type TextAlignment = 'left' | 'right';

export interface TableInfo {
  headerVisible?: boolean;
}
