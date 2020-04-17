import * as $constants from './utilities/constants';
import $ from 'jquery';
import { initialShapeOptions } from './utilities/initials';
import { TetrisTile } from './tetris-title';
import { IShapeOptions } from './models/shape-options.interface';
import { hex2binstr } from './utilities/functions';
import { ITileOptions } from './models/tile-options.interface';
import { TetrisMatrix } from './models/tetris-matrix.type';

export class TetrisShape {
  protected blocks: TetrisTile[] = new Array<TetrisTile>(4);
  protected readonly tilesNumber = 4;

  constructor(protected options: IShapeOptions = null) {
    this.options = options ? options : initialShapeOptions();
    this.initBlocks();
  }

  reset(options: IShapeOptions) { this.options = options; }

  protected get stage(): JQuery<HTMLElement> { return $($constants.domSelectors.activeStage); }

  get top() { return this.options.top; }
  get left() { return this.options.left; }

  setPosition(left: number, top: number) {
    this.options.left = left;
    this.options.top = top;

    this.setBlocks();
    this.drawBlocks(this.stage);
  }

  protected initBlocks(): void {
    for (let i = 0; i < 4; i++) {
      this.blocks[i] = new TetrisTile();
    }
  }

  /**
   * Setup tiles
   */
  setBlocks() {
    const binstr = hex2binstr($constants.shapes[this.options.typeId][this.options.direction].toString(), 16);

    const unitArray = [binstr.substr(0, 4),
      binstr.substr(4, 4),
      binstr.substr(8, 4),
      binstr.substr(12, 4)
    ];

    let blockId = 0;
    for (let i = 0; i < 4 ; i++ ) {
      const blockLeft = this.options.left + i * this.options.width;
      for (let j = 0; j < 4 ; j++ ) {
        const blockTop = this.options.top + j * this.options.width;
        if (unitArray[i].substr(j, 1) === '1') {
          const tileOptions: ITileOptions = {
            left: blockLeft,
            top: blockTop,
            iconId: this.options.iconId,
            width: this.options.width,
            colorId: this.options.colorId,
          };
          this.blocks[blockId].reset(tileOptions);
          blockId++;
        }
      }
    }
  }

  /**
   * Get HTML
   */
  getHtml(): string {
    let html = '';

    for (let i = 0; i < this.tilesNumber; i++) {
      html += this.blocks[i].getHtml();
    }
    return html;
  }

  /**
   * Draw tiles one by one
   * @param obj HTMLElement
   */
  draw(obj: JQuery<HTMLElement>): void {
    this.setBlocks();
    for (let i = 0; i < this.tilesNumber; i++) {
      this.blocks[i].draw(obj);
    }
  }

  /**
   * Draw tiles all together
   * @param obj HTMLElement
   */
  drawBlocks(obj: JQuery<HTMLElement>) {
    let html = '';
    this.setBlocks();
    for (let i = 0; i < this.tilesNumber; i++) {
      html += this.blocks[i].getHtml();
    }
    obj.html(html);
  }

  occupyCells(matrix: TetrisMatrix) {
    for (var i = 0; i < 4; i++ ) {
      this.blocks[i].occupyCell(matrix);
    }
  }

  /**
   * Indicates if it's allowed to move left
   * @param matrix TetrisMatrix
   */
  moveLeftAllowed(matrix: TetrisMatrix): boolean {
    for (let i = 0; i < this.tilesNumber; i++) {
      const nextLeft = this.blocks[i].left / $constants.tileSize - 1;
      const nextTop = this.blocks[i].top / $constants.tileSize;

      if (nextLeft < 0 || matrix[nextTop][nextLeft]  > -1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Indicates if it's allowed to move right
   * @param matrix TetrisMatrix
   */
  moveRightAllowed(matrix: TetrisMatrix): boolean {
    for (let i = 0; i < this.tilesNumber; i++) {
      const nextLeft = this.blocks[i].left / $constants.tileSize + 1;
      const nextTop = this.blocks[i].top / $constants.tileSize;

      if (nextLeft > 9 || matrix[nextTop][nextLeft]  > -1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Indicates if it's allowed to move right
   * @param matrix TetrisMatrix
   */
  moveDownAllowed(matrix: TetrisMatrix): boolean {
    for (let i = 0; i < this.tilesNumber; i++) {
      const nextLeft = this.blocks[i].left / $constants.tileSize;
      const nextTop = this.blocks[i].top / $constants.tileSize + 1;

      if (nextTop > 19 || matrix[nextTop][nextLeft]  > -1) {
        return false;
      }
    }

    return true;
  }

  /**
   * Indicates if it's allowed to rotate
   * @param matrix TetrisMatrix
   */
  rotateAllowed(matrix: TetrisMatrix): boolean {
    const options = Object.assign({}, this.options);
    options.direction = $constants.rotationSequence[this.options.direction];
    const newShape = new TetrisShape(options);
    newShape.setBlocks();

    for (let i = 0; i < 4; i++) {
      const nextLeft = Math.floor(newShape.blocks[i].left / $constants.tileSize);
      const nextTop = Math.floor(newShape.blocks[i].top / $constants.tileSize);

      if (nextTop > 19 || nextLeft > 9 || nextLeft < 0 || matrix[nextTop][nextLeft]  > -1) {
        return false;
      }
    }
  }

  moveDown() {
    this.options.top += $constants.tileSize;
    this.setBlocks();
    this.drawBlocks(this.stage);
  }

  moveLeft() {
    this.options.left -= $constants.tileSize;
    this.setBlocks();
    this.drawBlocks(this.stage);
  }

  moveRight() {
    this.options.left += $constants.tileSize;
    this.setBlocks();
    this.drawBlocks(this.stage);
  }

  rotate() {
    this.options.direction = $constants.rotationSequence[this.options.direction];
    this.setBlocks();
    this.drawBlocks(this.stage);
  }
}
