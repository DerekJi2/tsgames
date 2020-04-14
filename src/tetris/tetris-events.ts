import { Key } from './models/key.enum';
import $ from 'jquery';
import { ITetrisGame } from './models/tetris-game.interface';

export class TetrisEvents {
  init(tetris: ITetrisGame) {
    $(document).on('keydown', (event) => this.onKeydown(event, tetris));
  }

  onKeydown(event: JQuery.KeyDownEvent, that: ITetrisGame) {
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
