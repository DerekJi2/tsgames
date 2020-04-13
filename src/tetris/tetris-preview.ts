import { TetrisShape } from './tetris-shape';
import { IShapeOptions } from './models/shape-options.interface';
import { initialShapeOptions } from './utilities/initials';
import { random } from './utilities/functions';
import * as $constants from './utilities/constants';
import $ from 'jquery';

export class TetrisPreview {
  protected shape: TetrisShape;

  constructor(protected shapeOptions: IShapeOptions = null) {
    this.shapeOptions = shapeOptions ? shapeOptions : initialShapeOptions();
    this.shape = new TetrisShape(this.shapeOptions);
  }

  randomNext() {
    const options = Object.assign({}, this.shapeOptions);
    options.colorId = random(7);
    options.typeId = random(7);
    options.direction = random(4);
    options.left = $constants.xOffsets[options.typeId][options.direction];
    options.top = $constants.yOffsets[options.typeId][options.direction];

    this.shape = new TetrisShape(options);
  }

  draw() {
    this.randomNext();
    $constants.gameScreen.nextBlock.html('');
    this.shape.drawBlocks($('#nextBlock'));
  }
}
