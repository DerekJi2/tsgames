import { ITileOptions } from './models/tile-options.interface';
import { TetrisMatrix } from './models/tetris-matrix.type';
import { initialTileOptions } from './utilities/initials';

const template = require('./templates/tile.template.html').default;

export class TetrisTile {
  constructor(protected options: ITileOptions = null) {
    this.options = options ? options : initialTileOptions();
  }

  reset(options: ITileOptions) { this.options = options; }
  get top() { return this.options.top; }
  get left() { return this.options.left; }

  /**
   * Take a cell in the matrix
   * @param matrix Tetrix Matrix
   */
  occupyCell(matrix: TetrisMatrix) {
    var x = Math.floor(this.options.left / this.options.width);
    var y = Math.floor(this.options.top / this.options.width);
    var cellVal = this.options.color;

    matrix[y][x] = cellVal;
  }

  /**
   * Get HTML of the tile
   */
  getHtml() {
    const imgPoint = {x: 0, y: 0};
    imgPoint.x = 0 - this.options.color * this.options.width;
    imgPoint.y = 0 - this.options.icon * this.options.width;

    let styleStr = Object.assign({}, template);
    styleStr = styleStr.replace(/_TOP_/g,  this.options.top );
    styleStr = styleStr.replace(/_LEFT_/g, this.options.left );
    styleStr = styleStr.replace(/_BPX_/g, imgPoint.x );
    styleStr = styleStr.replace(/_BPY_/g, imgPoint.y );

    return styleStr;
  }

  /**
   * Set HTML to the target object
   *
   * @param obj HTMLElement
   * @param bTop boolean
   */
  draw(obj: HTMLElement, bTop?: boolean) {
    const html = this.getHtml();
    const prevHtml = obj.innerHTML;
    obj.innerHTML = (bTop === true) ? html + prevHtml : html;
  }
}