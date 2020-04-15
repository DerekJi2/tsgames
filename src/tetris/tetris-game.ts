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

export class TetrisGame implements ITetrisGame {
  public score = 0;
  public matrix: TetrisMatrix = initialMatrix();
  public intervalId: number;
  public currentShape: TetrisShape;
  public status: ETetrisGameStatus = ETetrisGameStatus.notStarted;
  public preview = new TetrisPreview();
  public readonly configs: TetrisConfigs = new TetrisConfigs();
  public readonly samples: ITetrisSamples = new TetrisSamples(this.configs);
  public iconChangeCallback = () => {
    this.showNext();
    this.samples.show();
  }

  constructor() {
    this.createNewGame();

    this.configs.iconChangeCallback = this.iconChangeCallback;
  }

  init() {
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
  }

  /**
   *
   */
  stopGame(): void {
    clearInterval(this.intervalId);
  }

  begin(tetris: ITetrisGame): void {
    tetris.createNewGame();
    tetris.samples.hide();

    if (!tetris.currentShape) {
      tetris.currentShape = new TetrisShape(this.preview.ShapeOptions);
    }
    tetris.currentShape.setPosition($constants.tileSize * 3, 0);

    tetris.preview.draw(this.configs);

    tetris.status = ETetrisGameStatus.running;

    tetris.intervalId = window.setInterval(() => this.moveDown(tetris), this.configs.speedIntervals);
  }

  stop(): void { console.log('stop'); }
  moveLeft(tetris: ITetrisGame): void {
    if (tetris.status !== ETetrisGameStatus.running) {
      return;
    }

    if (tetris.currentShape.moveLeftAllowed(tetris.matrix) === false) {
      return;
    }

    tetris.currentShape.moveLeft();
  }

  moveRight(tetris: ITetrisGame): void {
    if (tetris.status !== ETetrisGameStatus.running) {
      return;
    }

    if (tetris.currentShape.moveRightAllowed(tetris.matrix) === false) {
      return;
    }

    tetris.currentShape.moveRight();
  }

  rotate(tetris: ITetrisGame): void {
    if (tetris.status !== ETetrisGameStatus.running) {
      return;
    }

    if (tetris.currentShape.rotateAllowed(tetris.matrix) === false) {
      return;
    }

    tetris.currentShape.rotate();
  }

  moveDown(tetris: ITetrisGame): void {
    if (tetris.currentShape.moveDownAllowed(tetris.matrix)) {
      tetris.currentShape.moveDown();
      return;
    }

    const grid = $($constants.domSelectors.grid);
    let str = tetris.currentShape.getDrawString();
    const gridHtml = grid.html() + str;
    grid.html(gridHtml);

    // 1.2. �������̨�е�ͼ��
    const stage = $($constants.domSelectors.stage);
    stage.html('');

    // 2.1 ����ǰshapeռ�õ�cell��Ϊ����ɫֵ
    tetris.currentShape.occupyCells(tetris.matrix);
    tetris.deleteOccupiedLines();

    // 2.2 ��Ϸ�������ж�
    if (tetris.isGameOver()) {
      stop();
      $($constants.buttonSelectors.start).val('Start');
      setTimeout(() => tetris.showGameOver(tetris), 500);

      return;
    }

    // // 3. ����nextBlockָ���������趨�µ�shape
    // this.currentShape.sets(g_nextShapeParams);
    // this.currentShape.sets("ut:0_ul:" + 28*3);
    tetris.currentShape.reset(tetris.preview.ShapeOptions);
    tetris.currentShape.setPosition($constants.tileSize * 3, 0);

    // // 4����Ԥ��ͼ�����ɲ���ʾ��һ��shape
    // var objNextFrm = new ViewNextFrameClass("nextBlock");
    // //objNextFrm = g_game.objNextFrm;
    // objNextFrm.randomNext();
    // objNextFrm.draw();
    tetris.preview.randomNext(tetris.configs);
    tetris.preview.draw(tetris.configs);
  }

  showGameOver(tetris: ITetrisGame) {

  }

  deleteOccupiedLines() {
    // var bRedraw = false;

    // /**/
    // var i = 19;
    // var N = 0;
    // while (i > 0)
    // {
    //   var str = CELL[i].toString();
    //   if ( str.indexOf("-1") < 0 )
    //   {
    //     debugInfo("Deleting line " + i + ": " + str);
    //     bRedraw = true;
    //     N++;
    //     deleteLine(i);

    //     continue;
    //   }
    //   i--;
    // }

    // if ( N > 0)
    // {
    //   g_game.score += (100 +( N-1)* 50) * N;
    // }


    // if (bRedraw == true)
    // {
    //   redrawGridByCell();

    //   var pScoreObj = E("score");
    //   pScoreObj.innerText = g_game.score;
    // }
  }

  isGameOver(): boolean {
    return false;
    // var bOver = false;
    // var isEmptyLines = new Array(20);
    // for (var i = 0; i < 19; i++)
    // {
    //   isEmptyLines[i] = 1;
    //   for (var j = 0; j < 10; j++ )
    //   {
    //     if (CELL[i][j] > -1)	// �����ǰ�д��ڷ��飬����зǿգ���0��
    //     {
    //       isEmptyLines[i] = 0;
    //       break;
    //     }
    //   }
    // }

    // if (isEmptyLines.toString().indexOf("1") < 0)
    // {
    //   bOver = true;
    // }

    // return bOver;
  }

  /**
   *
   */
  toggleGameStatus(tetris: ITetrisGame): void {
    const button = $($constants.domSelectors.stopButton);
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
