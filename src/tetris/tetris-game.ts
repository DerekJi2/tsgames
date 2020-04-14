import * as $constants from './utilities/constants';
import { TetrisMatrix } from './models/tetris-matrix.type';
import { ETetrisGameStatus } from './models/tetris-game-status.enum';
import { TetrisPreview } from './tetris-preview';
import { initialMatrix, initialShapeOptions } from './utilities/initials';
import $ from 'jquery';
import { TetrisShape } from './tetris-shape';
import { IShapeOptions } from './models/shape-options.interface';
import { TetrisConfigs } from './tetris-configs';
import { ITetrisGame } from './models/tetris-game.interface';

export class TetrisGame implements ITetrisGame {
  public score = 0;
  public matrix: TetrisMatrix = initialMatrix();
  public intervalId: any;
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

  begin(): void { console.log('begin'); }
  stop(): void { console.log('stop'); }
  moveLeft(): void { console.log('move left');  }
  moveRight(): void { console.log('move right'); }
  rotate(): void { console.log('rotate'); }
  moveDown(): void { console.log('move down'); }


  /**
   *
   */
  toggleGameStatus(): void {
    const button = $($constants.domSelectors.stopButton);
    switch (this.status) {
      case ETetrisGameStatus.notStarted:
        if (button.val() === 'Stop') {
          break;
        }
        button.text('Stop');
        this.begin();
        break;

      case ETetrisGameStatus.running:
        button.text('Start');
        this.stop();
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
