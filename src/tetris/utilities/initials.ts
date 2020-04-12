import { ITileOptions } from '../models/tile-options.interface';
import { tileSize } from './constants';
import { IShapeOptions } from '../models/shape-options.interface';

export const initialTileOptions = (): ITileOptions => {
  return {
    color: 0,
    icon: 0,
    top: 0,
    left: 0,
    width: tileSize,
  };
};


export const initialShapeOptions = (): IShapeOptions => {
  return {
    color: 0,
    icon: 0,
    top: 0,
    left: 0,
    type: 0,
    direction: 0,
    width: tileSize,
  };
};

