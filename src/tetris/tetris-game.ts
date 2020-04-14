import * as $constants from './utilities/constants';
import { TetrisMatrix } from './models/tetris-matrix.type';
import { ETetrisGameStatus } from './models/tetris-game-status.enum';
import { TetrisPreview } from './tetris-preview';
import { initialMatrix, initialShapeOptions } from './utilities/initials';
import $ from 'jquery';
import { TetrisShape } from './tetris-shape';
import { IShapeOptions } from './models/shape-options.interface';
import { TetrisConfigs } from './tetris-configs';

export class TetrisGame {
  public score = 0;
  public keyEvent = window.event;
  public matrix: TetrisMatrix = initialMatrix();
  public intervalId: any;
  public status: ETetrisGameStatus = ETetrisGameStatus.notStarted;
  public preview = new TetrisPreview();
  public readonly configs = new TetrisConfigs();
  public iconChangeCallback = () => {
    this.showNext();
    this.showSamples();
  };

  constructor() {
    this.createNewGame();

    this.configs.iconChangeCallback = this.iconChangeCallback;
  }

  init() {
    this.showDebugFrm();
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

  begin(): void {

  }

  stop(): void {

  }

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

  showDebugFrm() {
    const styleStr = $constants._DEBUG_ ? 'none' : 'block';
    $('#debugfrm').css('display', styleStr);
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
