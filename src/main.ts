import $ from 'jquery';

import { TetrisGame } from './tetris/tetris-game';
import { TetrisEvents } from './tetris/tetris-events';
import { ITetrisGame } from './tetris/models/tetris-game.interface';
import { ITabsComponent } from './tetris/models/tabs-component.interface';
import { TabsComponent } from './tetris/tabs.component';


const tetris: ITetrisGame = new TetrisGame();
const tabs: ITabsComponent = new TabsComponent();
const events = new TetrisEvents();

document.addEventListener('DOMContentLoaded', () => {
  tetris.init();
  events.init(tetris, tabs);
});
