import * as $constants from './utilities/constants';
import { TetrisMatrix } from './models/tetris-matrix.type';
import { ETetrisGameStatus } from './models/tetris-game-status.enum';
import { TetrisPreview } from './tetris-preview';
import { initialMatrix } from './utilities/initials';
import $ from 'jquery';

export class TetrisGame {
  public score = 0;
  public keyEvent = window.event;
  public matrix: TetrisMatrix = initialMatrix();
  public intervalId: any;
  public status: ETetrisGameStatus = ETetrisGameStatus.notStarted;
  public preview = new TetrisPreview();

  constructor() {
    this.createNewGame();
  }

  init() {
    this.showDebugFrm();
    this.showNext();

  }

  /**
   *
   */
  createNewGame(): void {
    this.score = 0;
    $constants.gameScreen.score.text('0');
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
    switch (this.status) {
      case ETetrisGameStatus.notStarted:
        if ($constants.gameScreen.stopButton.val() === 'Stop') {
          break;
        }
        $constants.gameScreen.stopButton.text('Stop');
        this.begin();
        break;

      case ETetrisGameStatus.running:
        $constants.gameScreen.stopButton.text('Start');
        this.stop();
        break;

      default:
        break;
    }
  }

  showDebugFrm() {
    var styleStr = $constants._DEBUG_ ? 'none' : 'block';
    $('#debugfrm').css('display', styleStr);
  }

  showNext() { this.preview.draw(); }
}