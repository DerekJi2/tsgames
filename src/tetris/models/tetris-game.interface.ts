import { ETetrisGameStatus } from './tetris-game-status.enum';
import { TetrisPreview } from '../tetris-preview';
import { TetrisShape } from '../tetris-shape';

export interface ITetrisGame {

  status: ETetrisGameStatus;
  preview: TetrisPreview;
  currentShape: TetrisShape;
  intervalId: number;

  createNewGame(): void;

  begin(tetris: ITetrisGame): void;
  stop(): void;

  moveLeft(): void;
  moveRight(): void;
  moveDown(): void;
  rotate(): void;

  iconChangeCallback(): void;
  toggleGameStatus(tetris: ITetrisGame): void;
}
