import { ReactNode } from 'react';

export interface ColumnInfo {
  key: string;
  title: ReactNode;
  textAlignment?: 'left' | 'right';
}

export interface RowInfo {
  id: string; // TODO: How to make it better?
  cells: Record<string, CellInfo>; // TODO: Type safety with generics?
  highlight?: RowHighlightInfo;
}

export interface RowHighlightInfo {
  direction: 'left' | 'right';
  color: string; // TODO: Is there any type for CSS color?
  percent: number; // 0 - 100
}

interface CellInfo {
  value: ReactNode;
  textAlignment?: TextAlignment;
}

export type TextAlignment = 'left' | 'right';
