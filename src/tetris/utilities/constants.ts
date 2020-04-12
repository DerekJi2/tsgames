import { TetrisMatrix } from '../models/tetris-matrix.type';

export const tileSize = 28;
export const rotationSequence = [1, 2, 3, 0];

export const TetrisGame = {
  grid: document.getElementById('grid'),
  stage: document.getElementById('stage'),
  gameover: document.getElementById('gameover'),
  nextBlock: document.getElementById('nextBlock'),
  score: document.getElementById('score'),
};

export const shapeI = [0xf000, 0x4444, 0xf000, 0x4444];
export const shapeZ = [0x6c00, 0x4620, 0x6c00, 0x4620];   // Z: (H, V, H, V)
export const shapeS = [0xc600, 0x2640, 0xc600, 0x2640];   // S: (H, V, H, V)
export const shapeT = [0xe400, 0x8c80, 0x4e00, 0x4c40];   // T: (donw, left, up, right)
export const shapeL = [0xe800, 0x88c0, 0x2e00, 0xc440];   // L: (90, 180, 270, 0) -- clockwise rotation
export const shapeJ = [0x8e00, 0x44c0, 0xe200, 0xc880];   // J: (90, 180, 270, 0) -- clockwise rotation
export const shapeO = [0x6600, 0x6600, 0x6600, 0x6600];   // O

export const shapes: TetrisMatrix = [
  shapeI,
  shapeZ,
  shapeS,
  shapeT,
  shapeL,
  shapeJ,
  shapeO,
];
