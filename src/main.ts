import { TetrisGame } from './tetris/tetris-game';

const tetris = new TetrisGame();
window.onload = tetris.init;