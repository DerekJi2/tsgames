import { Key } from './models/key.enum';
import $ from 'jquery';
import { ITetrisGame } from './models/tetris-game.interface';

export class TetrisEvents {
  init(tetris: ITetrisGame) {
    $(document).on('keydown', (event) => this.onKeydown(event, tetris));
  }

  onKeydown(event: JQuery.KeyDownEvent, tetris: ITetrisGame) {
    event.preventDefault();

    const evtObjElem: any = event.target;
    if (evtObjElem.tagName === 'INPUT' || evtObjElem.tagName === 'SELECT') { return; }

    switch (event.key) {
      case Key.LeftArrow:	// LeftKey
        tetris.moveLeft();
        break;
      case Key.RightArrow:	// RightKey
        tetris.moveRight();
        break;
      case Key.UpArrow:	// UpKey
      case Key.Space:	// SPACE
        tetris.rotate();
        break;
      case Key.DownArrow:	// DownKey
        tetris.moveDown();
        break;
      default:
        console.log(event.key);
        break;
    }
  }

}
