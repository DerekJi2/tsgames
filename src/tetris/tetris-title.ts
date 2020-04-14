import { ITileOptions } from './models/tile-options.interface';
import { TetrisMatrix } from './models/tetris-matrix.type';
import { initialTileOptions } from './utilities/initials';
import $ from 'jquery';

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
    const x = Math.floor(this.options.left / this.options.width);
    const y = Math.floor(this.options.top / this.options.width);
    const cellVal = this.options.colorId;

    matrix[y][x] = cellVal;
  }

  /**
   * Get HTML of the tile
   */
  getHtml() {
    const imgPoint = {x: 0, y: 0};
    imgPoint.x = 0 - this.options.colorId * this.options.width;
    imgPoint.y = 0 - this.options.iconId * this.options.width;

    let styleStr: string = $('#tile-template-html').html();
    styleStr = styleStr.replace(/_TOP_/g,  this.options.top.toString() );
    styleStr = styleStr.replace(/_LEFT_/g, this.options.left.toString() );
    styleStr = styleStr.replace(/_BPX_/g, imgPoint.x.toString() );
    styleStr = styleStr.replace(/_BPY_/g, imgPoint.y.toString() );

    return styleStr;
  }

  /**
   * Set HTML to the target object
   *
   * @param obj HTMLElement
   * @param bTop boolean
   */
  draw(obj: JQuery<HTMLElement>, bTop?: boolean) {
    const html = this.getHtml();
    const prevHtml = obj.html();
    obj.html( (bTop === true) ? html + prevHtml : html);
  }
}
