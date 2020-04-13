import { TetrisGame } from './tetris/tetris-game';
import $ from 'jquery';

const tetris = new TetrisGame();
$(document).ready(() => tetris.init() );