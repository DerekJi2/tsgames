import { gameScreen, _DEBUG_ } from './utilities/constants';
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
    gameScreen.score.text('0');
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
        if (gameScreen.stopButton.val() === 'Stop') {
          break;
        }
        gameScreen.stopButton.text('Stop');
        this.begin();
        break;

      case ETetrisGameStatus.running:
        gameScreen.stopButton.text('Start');
        this.stop();
        break;

      default:
        break;
    }
  }

  showDebugFrm() {
    var styleStr = _DEBUG_ ? 'none' : 'block';
    $('#debugFrm').css('display', styleStr);
  }

  showNext() { this.preview.draw(); }
}