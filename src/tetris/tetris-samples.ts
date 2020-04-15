import * as $constants from './utilities/constants';
import $ from 'jquery';

import { TetrisShape } from './tetris-shape';
import { IShapeOptions } from './models/shape-options.interface';
import { ITetrisConfigs } from './models/tetris-configs.interface';
import { ITetrisSamples } from './models/tetris-samples.interface';


export class TetrisSamples implements ITetrisSamples {
  constructor(protected configs: ITetrisConfigs) {
  }

  get panel(): JQuery<HTMLElement> { return $($constants.domSelectors.backgroundGrid); }

  show() {
    let html = '';

    for (let i = 0; i < $constants.shapes.length; i++) {
      const options: IShapeOptions = {
        typeId: $constants.samplesMatrix.typeId[i],
        direction: $constants.samplesMatrix.direction[i],
        colorId: i,
        iconId: this.configs.iconId,
        left: $constants.samplesMatrix.left[i],
        top: $constants.samplesMatrix.top[i],
        width: $constants.tileSize,
      };
      const shape = new TetrisShape(options);
      shape.setBlocks();
      html += shape.getHtml();
    }

    this.panel.html(html);
  }

  hide() { this.panel.html(''); }
}