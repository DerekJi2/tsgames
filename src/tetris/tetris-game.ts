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

export class TetrisGame implements ITetrisGame {
  public score = 0;
  public matrix: TetrisMatrix = initialMatrix();
  public intervalId: number;
  public currentShape: TetrisShape;
  public status: ETetrisGameStatus = ETetrisGameStatus.notStarted;
  public preview = new TetrisPreview();
  public readonly configs = new TetrisConfigs();
  public iconChangeCallback = () => {
    this.showNext();
    this.showSamples();
  }

  constructor() {
    this.createNewGame();

    this.configs.iconChangeCallback = this.iconChangeCallback;
  }

  init() {
    this.showNext();
    this.showSamples();

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

    if (!tetris.currentShape) {
      tetris.currentShape = new TetrisShape(this.preview.ShapeOptions);
    }
    tetris.currentShape.setPosition($constants.tileSize * 3, 0);

    tetris.preview.draw(this.configs);

    tetris.status = ETetrisGameStatus.running;

    tetris.intervalId = window.setInterval(() => this.moveDown(tetris), this.configs.speedIntervals);
  }

  stop(): void { console.log('stop'); }
  moveLeft(): void { console.log('move left');  }
  moveRight(): void { console.log('move right'); }
  rotate(): void { console.log('rotate'); }
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
      // E("startBtn").value = "��ʼ";
      // setTimeout(showGameOver, 500);

      return;
    }

    // // 3. ����nextBlockָ���������趨�µ�shape
    // this.currentShape.sets(g_nextShapeParams);
    // this.currentShape.sets("ut:0_ul:" + 28*3);

    // // 4����Ԥ��ͼ�����ɲ���ʾ��һ��shape
    // var objNextFrm = new ViewNextFrameClass("nextBlock");
    // //objNextFrm = g_game.objNextFrm;
    // objNextFrm.randomNext();
    // objNextFrm.draw();
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

  showSamples() {
    const gridObj = $('#grid');

    let drawStr = '';

    for (let i = 0; i < 7; i++) {
      const options: IShapeOptions = {
        typeId: $constants.samplesMatrix.typeId[i],
        direction: $constants.samplesMatrix.direction[i],
        colorId: i,
        iconId: this.configs.iconId,
        left: $constants.samplesMatrix.left[i],
        top: $constants.samplesMatrix.top[i],
        width: $constants.tileSize,
      };
      const shape = new TetrisShape(options);
      shape.setBlocks();
      drawStr += shape.getDrawString();
    }

    gridObj.html(drawStr);
  }

  showNext() { this.preview.draw(this.configs); }
}
