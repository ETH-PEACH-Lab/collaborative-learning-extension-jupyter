import { Cell } from './cell_types';

export type CellOutput = {
  type: 'error' | 'stdout';
  output: string;
  cell: Cell;
};
