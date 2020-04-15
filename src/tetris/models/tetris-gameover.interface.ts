import { TetrisMatrix } from './tetris-matrix.type';

export interface ITetrisGameover {
  template: string;
  panel: JQuery<HTMLElement>;

  show(): void;
  hide(): void;
  check(matrix: TetrisMatrix): boolean;
}
