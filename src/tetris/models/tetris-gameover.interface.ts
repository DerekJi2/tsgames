import { TetrisMatrix } from './tetris-matrix.type';
import { ITetrisGame } from './tetris-game.interface';

export interface ITetrisGameover {
  template: string;
  panel: JQuery<HTMLElement>;

  show(): void;
  hide(): void;
  check(matrix: TetrisMatrix): boolean;
  onGameover(tetris: ITetrisGame): void;
}
