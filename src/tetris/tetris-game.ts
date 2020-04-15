import * as $constants from './utilities/constants';
import $ from 'jquery';

import { TetrisMatrix } from './models/tetris-matrix.type';
import { ETetrisGameStatus } from './models/tetris-game-status.enum';
import { TetrisPreview } from './tetris-preview';
import { initialMatrix, initialShapeOptions } from './utilities/initials';
import { TetrisShape } from './tetris-shape';
import { IShapeOptions } from './models/shape-options.interface';
import { TetrisConfigs } from './tetris-configs';
import { ITetrisGame } from './models/tetris-game.interface';
import { TetrisSamples } from './tetris-samples';
import { ITetrisSamples } from './models/tetris-samples.interface';
import { ITetrisConfigs } from './models/tetris-configs.interface';
import { ITetrisGameover } from './models/tetris-gameover.interface';
import { TetrisGameover } from './tetris-gameover';
import { ITileOptions } from './models/tile-options.interface';
import { TetrisTile } from './tetris-title';

export class TetrisGame implements ITetrisGame {
  public score = 0;
  public matrix: TetrisMatrix = initialMatrix();
  public intervalId: number;
  public currentShape: TetrisShape;
  public status: ETetrisGameStatus = ETetrisGameStatus.notStarted;
  public preview = new TetrisPreview();
  public readonly configs: TetrisConfigs = new TetrisConfigs();
  public samples: ITetrisSamples;
  public gameover: ITetrisGameover;

  public iconChangeCallback = () => {
    this.showNext();
    this.samples.show();
  }

  constructor() {
    this.createNewGame();

    this.configs.iconChangeCallback = this.iconChangeCallback;
  }

  /**
   *
   */
  init() {
    this.gameover = new TetrisGameover();
    this.samples = new TetrisSamples(this.configs);

    this.showNext();
    this.samples.show();

    this.configs.initDropdownLists();
  }

  /**
   *
   */
  createNewGame(): void {
    this.score = 0;
    $($constants.domSelectors.score).text('0');
    this.matrix = initialMatrix();
  }

  /**
   * Start to play
   * @param tetris TetrisGame
   */
  begin(tetris: ITetrisGame): void {
    tetris.createNewGame();
    tetris.samples.hide();
    tetris.gameover.hide();

    if (!tetris.currentShape) {
      tetris.currentShape = new TetrisShape(this.preview.ShapeOptions);
    }
    tetris.currentShape.setPosition($constants.tileSize * 3, 0);

    tetris.preview.draw(this.configs);

    tetris.status = ETetrisGameStatus.running;

    tetris.intervalId = window.setInterval(() => this.moveDown(tetris), this.configs.speedIntervals);
  }

  /**
   * Stop the game
   */
  stop(): void {
    const tetris = this;
    tetris.status = ETetrisGameStatus.notStarted;
    clearInterval(tetris.intervalId);
    tetris.matrix = initialMatrix();
  }

  /**
   * Move left
   * @param tetris TetrisGame
   */
  moveLeft(tetris: ITetrisGame): void {
    if (tetris.status !== ETetrisGameStatus.running) {
      return;
    }

    if (tetris.currentShape.moveLeftAllowed(tetris.matrix) === false) {
      return;
    }

    tetris.currentShape.moveLeft();
  }

  /**
   * Move right
   * @param tetris TetrisGame
   */
  moveRight(tetris: ITetrisGame): void {
    if (tetris.status !== ETetrisGameStatus.running) {
      return;
    }

    if (tetris.currentShape.moveRightAllowed(tetris.matrix) === false) {
      return;
    }

    tetris.currentShape.moveRight();
  }

  /**
   * Rotate
   * @param tetris TetrisGame
   */
  rotate(tetris: ITetrisGame): void {
    if (tetris.status !== ETetrisGameStatus.running) {
      return;
    }

    if (tetris.currentShape.rotateAllowed(tetris.matrix) === false) {
      return;
    }

    tetris.currentShape.rotate();
  }

  /**
   *
   * @param tetris TetrisGame
   */
  moveDown(tetris: ITetrisGame): void {
    // Keep Going Down
    if (tetris.currentShape.moveDownAllowed(tetris.matrix)) {
      tetris.currentShape.moveDown();
      return;
    }

    // Game Over
    if (tetris.gameover.check(tetris.matrix)) {
      stop();
      $($constants.domSelectors.startButton).val('Start');
      setTimeout(() => tetris.gameover.show(), 500);

      return;
    }

    // Next
    {
      // Update backgroundGrid with the current shape
      const backgroundGrid = $($constants.domSelectors.backgroundGrid);
      let str = tetris.currentShape.getHtml();
      const gridHtml = backgroundGrid.html() + str;
      backgroundGrid.html(gridHtml);

      // Clear foreground active stage for the next shape
      const activeStage = $($constants.domSelectors.activeStage);
      activeStage.html('');

      // Update the background matrix
      tetris.currentShape.occupyCells(tetris.matrix);
      tetris.removeFullRowsAndScore(tetris);

      // Take the next shape from the preview panel
      tetris.currentShape.reset(tetris.preview.ShapeOptions);
      tetris.currentShape.setPosition($constants.tileSize * 3, 0);
      tetris.currentShape.moveDown();

      // Re-generate the next shape and display it in the preview panel
      tetris.preview.randomNext(tetris.configs);
      tetris.preview.draw(tetris.configs);
    }
  }

  /**
   * Remove a row from the background matrix
   * @param matrix background matrix
   * @param rowNum the number of the line, which is going to be removed
   */
  removeRow(matrix: TetrisMatrix, rowNum: number): void {
    if (rowNum > 19 || rowNum < 0) return;

    for (let i = rowNum; i > 0 ; i--) {
      for (let j = 0; j < 10 ; j++) {
        matrix[i][j] = matrix[i - 1][j];
      }
    }
    matrix[0] = [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];
  }

  /**
   * Remove all full rows (if any) & scoring
   * @param tetris ITetrisGame
   */
  removeFullRowsAndScore(tetris: ITetrisGame) {
    var redrawRequired = false;

    /**/
    var numberOfLinesDeleted = 0;
    var i = $constants.screenMaxY - 1;
    while (i > 0) {
      var str = tetris.matrix[i].toString();
      if ( str.indexOf('-1') < 0 ) {
        console.log('Deleting line ' + i + ': ' + str);
        redrawRequired = true;
        numberOfLinesDeleted++;
        tetris.removeRow(tetris.matrix, i);

        continue;
      }
      i--;
    }

    if ( numberOfLinesDeleted > 0) {
      tetris.score += (100 + ( numberOfLinesDeleted - 1) * 50) * numberOfLinesDeleted;
    }


    if (redrawRequired === true) {
      tetris.redrawGridByCell(tetris);

      const scoreObj = $($constants.domSelectors.score);
      scoreObj.text(tetris.score);
    }
  }

  /**
   * Redraw the background grid panel with the updated background matrix
   * @param tetris TetrisGame
   */
  redrawGridByCell(tetris: ITetrisGame) {
    const gridObj = $($constants.domSelectors.backgroundGrid);
    var redrawStr = '';

    for (var i = 0; i < 20; i++) {
      for (var j = 0; j < 10; j++ ) {
        if (tetris.matrix[i][j] < 0) { // no tiles
          continue;
        }

        const tileOptions: ITileOptions = {
          top: i * $constants.tileSize,
          left: j * $constants.tileSize,
          colorId: tetris.matrix[i][j],
          width: $constants.tileSize,
          iconId: tetris.configs.iconId
        };
        var block = new TetrisTile(tileOptions);
        redrawStr += block.getHtml();
      }
    }

    gridObj.html(redrawStr);
  }


  /**
   *
   */
  toggleGameStatus(tetris: ITetrisGame): void {
    const button = $($constants.domSelectors.startButton);
    switch (tetris.status) {
      case ETetrisGameStatus.notStarted:
        if (button.val() === 'Stop') {
          break;
        }
        button.text('Stop');
        tetris.begin(tetris);
        break;

      case ETetrisGameStatus.running:
        button.text('Start');
        tetris.stop();
        break;

      default:
        break;
    }
  }

  showNext() { this.preview.draw(this.configs); }
}
