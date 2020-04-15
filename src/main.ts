import $ from 'jquery';

import { TetrisGame } from './tetris/tetris-game';
import { TetrisEvents } from './tetris/tetris-events';
import { ITetrisGame } from './tetris/models/tetris-game.interface';


const tetris: ITetrisGame = new TetrisGame();
const events = new TetrisEvents();

document.addEventListener('DOMContentLoaded', () => {
  tetris.init();
  events.init(tetris);
});
