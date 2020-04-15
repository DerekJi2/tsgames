import { ETetrisGameStatus } from './tetris-game-status.enum';
import { TetrisPreview } from '../tetris-preview';
import { TetrisShape } from '../tetris-shape';
import { TetrisMatrix } from './tetris-matrix.type';
import { ITetrisSamples } from './tetris-samples.interface';
import { ITetrisConfigs } from './tetris-configs.interface';
import { TetrisConfigs } from '../tetris-configs';
import { ITetrisGameover } from './tetris-gameover.interface';

export interface ITetrisGame {

  score: number;
  status: ETetrisGameStatus;
  preview: TetrisPreview;
  currentShape: TetrisShape;
  matrix: TetrisMatrix;
  intervalId: number;
  configs: TetrisConfigs;
  samples: ITetrisSamples;
  gameover: ITetrisGameover;

  init(): void;
  createNewGame(): void;

  removeRow(matrix: TetrisMatrix, lineNo: number): void;
  removeFullRowsAndScore(tetris: ITetrisGame): void;
  redrawGridByCell(tetris: ITetrisGame): void;

  begin(tetris: ITetrisGame): void;
  stop(): void;

  moveLeft(tetris: ITetrisGame): void;
  moveRight(tetris: ITetrisGame): void;
  moveDown(tetris: ITetrisGame): void;
  rotate(tetris: ITetrisGame): void;

  iconChangeCallback(): void;
  toggleGameStatus(tetris: ITetrisGame): void;


}
