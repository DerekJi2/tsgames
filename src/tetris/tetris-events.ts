import { TetrisGame } from './tetris-game';
import { Key } from './models/key.enum';

export class TetrisEvents {
  onKeydown(event: JQuery.KeyDownEvent, that: TetrisGame) {
    event.preventDefault();

    const evtObjElem: any = event.target;
    if (evtObjElem.tagName === 'INPUT' || evtObjElem.tagName === 'SELECT') { return; }

    switch (event.key) {
      case Key.LeftArrow:	// LeftKey
        that.moveLeft();
        break;
      case Key.RightArrow:	// RightKey
        that.moveRight();
        break;
      case Key.UpArrow:	// UpKey
      case Key.Space:	// SPACE
        that.rotate();
        break;
      case Key.DownArrow:	// DownKey
        that.moveDown();
        break;
      default:
        console.log(event.key);
        break;
    }
  }

}
