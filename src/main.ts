import $ from 'jquery';

import { TetrisGame } from './tetris/tetris-game';
import { TetrisEvents } from './tetris/tetris-events';


const tetris = new TetrisGame();
const events = new TetrisEvents();

document.addEventListener('DOMContentLoaded', () => {
  tetris.init();
  events.init(tetris);
});
