import * as $constants from './utilities/constants';
import $ from 'jquery';
import { ITetrisGameover } from './models/tetris-gameover.interface';
import { TetrisMatrix } from './models/tetris-matrix.type';
import { ITetrisGame } from './models/tetris-game.interface';

export class TetrisGameover implements ITetrisGameover {

  constructor() {
    this.init();
    this.hide();
  }

  get template(): string { return $($constants.templates.gameover).html(); }
  get panel(): JQuery<HTMLElement> { return $($constants.domSelectors.gameover); }

  init() { this.panel.html(this.template); }
  show() {
    this.panel.show();
    $($constants.domSelectors.startButton).text('Start');
  }

  hide() { this.panel.hide(); }

  /**
   * Indicates if the game is over
   */
  check(matrix: TetrisMatrix): boolean {
    let over = false;

    let isEmptyRow: number[] = new Array<number>($constants.screenMaxY);
    for (let i = 0; i < $constants.screenMaxY - 1; i++) {
      isEmptyRow[i] = 1;
      for (let j = 0; j < $constants.screenMaxX; j++ ) {
        if (matrix[i][j] > -1) {
          isEmptyRow[i] = 0;
          break;
        }
      }
    }

    if (isEmptyRow.toString().indexOf('1') < 0) {
      over = true;
    }

    return over;
  }

  onGameover(tetris: ITetrisGame) {
    tetris.stop();
    setTimeout(() => tetris.gameover.show(), 500);
  }
}