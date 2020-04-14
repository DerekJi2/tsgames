import { ETetrisGameStatus } from './tetris-game-status.enum';
import { TetrisPreview } from '../tetris-preview';
import { TetrisShape } from '../tetris-shape';
import { TetrisMatrix } from './tetris-matrix.type';

export interface ITetrisGame {

  status: ETetrisGameStatus;
  preview: TetrisPreview;
  currentShape: TetrisShape;
  matrix: TetrisMatrix;
  intervalId: number;

  createNewGame(): void;
  isGameOver(): boolean;
  deleteOccupiedLines(): void;

  begin(tetris: ITetrisGame): void;
  stop(): void;

  moveLeft(): void;
  moveRight(): void;
  moveDown(tetris: ITetrisGame): void;
  rotate(): void;

  iconChangeCallback(): void;
  toggleGameStatus(tetris: ITetrisGame): void;
}
