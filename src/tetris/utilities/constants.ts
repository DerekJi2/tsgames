import { TetrisMatrix } from '../models/tetris-matrix.type';

export const _DEBUG_ = true;
export const tileSize = 28;
export const screenMaxY = 20;
export const screenMaxX = 10;
export const rotationSequence = [1, 2, 3, 0];
export const speedLevels = [500, 450, 400, 350, 300, 250, 200, 150, 100, 70];
export const bgImages = (('01,02,03,04,05,06,07,08,09,10,11').replace(/(\d\d)/g, '/assets/images/bg$1.jpg')).split(',');
export const blockIcons = ['Blocks 1', 'Vegetables', 'Blocks 2', 'Blocks 3', 'Office Blocks'];
export const defaultIconId = 0; // bg11.jpg
export const timeInterval = 200; // ms
export const tileTemplateHtml = '<div style="top:_TOP_px; left:_LEFT_px; background-position:_BPX_px _BPY_px;"></div>';

export const domSelectors = {
  debug: '#debugfrm',
  grid: '#grid',
  stage: '#stage',
  gameover: '#gameover',
  nextBlock: '#nextBlock',
  score: '#score',
  stopButton: '#stopBtn',
};

export const shapeI = [0xf000, 0x4444, 0xf000, 0x4444];
export const shapeZ = [0x6c00, 0x4620, 0x6c00, 0x4620];   // Z: (H, V, H, V)
export const shapeS = [0xc600, 0x2640, 0xc600, 0x2640];   // S: (H, V, H, V)
export const shapeT = [0xe400, 0x8c80, 0x4e00, 0x4c40];   // T: (donw, left, up, right)
export const shapeL = [0xe800, 0x88c0, 0x2e00, 0xc440];   // L: (90, 180, 270, 0) -- clockwise rotation
export const shapeJ = [0x8e00, 0x44c0, 0xe200, 0xc880];   // J: (90, 180, 270, 0) -- clockwise rotation
export const shapeO = [0x6600, 0x6600, 0x6600, 0x6600];   // O

export const xOffsetI = [24 + tileSize, 10, 24 + tileSize, 10];   // Bar: (H, V, H, V)
export const xOffsetZ = [10 + tileSize, tileSize, 10 + tileSize, tileSize];   // Z: (H, V, H, V)
export const xOffsetS = [10 + tileSize, tileSize, 10 + tileSize, tileSize];   // S: (H, V, H, V)
export const xOffsetT = [10 + tileSize, tileSize, 10 + tileSize, tileSize];   // T: (donw, left, up, right)
export const xOffsetL = [10 + tileSize, tileSize, 10 + tileSize, tileSize];   // L: (90, 180, 270, 0) -- clockwise rotation
export const xOffsetJ = [10 + tileSize, tileSize, 10 + tileSize, tileSize];   // J: (90, 180, 270, 0) -- clockwise rotation
export const xOffsetO = [10 + tileSize, 10 + tileSize, 10 + tileSize, 10 + tileSize];    // O

export const yOffsetI = [10, 24, 10, 24];	// Bar: (H, V, H, V)
export const yOffsetZ = [tileSize, 10, tileSize, 10];   // Z: (H, V, H, V)
export const yOffsetS = [tileSize, 10, tileSize, 10];   // S: (H, V, H, V)
export const yOffsetT = [tileSize, 10 + tileSize, tileSize, 10 + tileSize];  // T: (donw, left, up, right)
export const yOffsetL = [tileSize, 10 + tileSize, tileSize, 10 + tileSize];  // L: (90, 180, 270, 0) -- clockwise rotation
export const yOffsetJ = [tileSize, 10 + tileSize, tileSize, 10 + tileSize];  // J: (90, 180, 270, 0) -- clockwise rotation
export const yOffsetO = [10, 10, 10, 10];    // O

export const xOffsets = [ xOffsetI, xOffsetZ, xOffsetS, xOffsetT, xOffsetL, xOffsetJ, xOffsetO];
export const yOffsets = [ yOffsetI, yOffsetZ, yOffsetS, yOffsetT, yOffsetL, yOffsetJ, yOffsetO];

export const samplesMatrix = {
  typeId: [1, 0, 3, 2, 4, 5, 6],
  direction: [1, 0, 1, 2, 1, 0, 0],
  left: [2 * 28, 6 * 28, 2 * 28, 6 * 28, 2 * 28, 6 * 28, 2 * 28],
  top: [2 * 28, 2 * 28, 7 * 28, 7 * 28, 11 * 28, 11 * 28, 14 * 28],
};

export const shapes: TetrisMatrix = [shapeI, shapeZ, shapeS, shapeT, shapeL, shapeJ, shapeO];
