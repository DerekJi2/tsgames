import { Key } from './models/key.enum';
import $ from 'jquery';
import { ITetrisGame } from './models/tetris-game.interface';
import { ETetrisGameStatus } from './models/tetris-game-status.enum';
import * as $constants from './utilities/constants';

export class TetrisEvents {
  init(tetris: ITetrisGame) {
    $(document).on('keydown', (event) => this.onKeydown(event, tetris));

    $($constants.domSelectors.startButton).on('click', () => tetris.toggleGameStatus(tetris));
  }

  onKeydown(event: JQuery.KeyDownEvent, tetris: ITetrisGame) {
    if (tetris.status !== ETetrisGameStatus.running) {
      return;
    }

    const evtObjElem: any = event.target;
    if (evtObjElem.tagName === 'INPUT' || evtObjElem.tagName === 'SELECT') { return; }

    switch (event.key) {
      case Key.LeftArrow:	// LeftKey
        tetris.moveLeft(tetris);
        break;
      case Key.RightArrow:	// RightKey
        tetris.moveRight(tetris);
        break;
      case Key.UpArrow:	// UpKey
      case Key.Space:	// SPACE
        tetris.rotate(tetris);
        break;
      case Key.DownArrow:	// DownKey
        tetris.moveDown(tetris);
        break;
      default:
        console.log(event.key);
        return;
    }

    event.preventDefault();
  }

}
