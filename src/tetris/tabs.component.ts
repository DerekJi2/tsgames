
import $ from 'jquery';
import { ITabsComponent } from './models/tabs-component.interface';

export class TabsComponent implements ITabsComponent {

  get tabs(): JQuery<HTMLElement> {
    return $('#tab-nav .tab-menu');
  }

  tabMenu(id: number): JQuery<HTMLElement> { return $(`#tm${id}`); }
  tabContent(id: number): JQuery<HTMLElement> { return $(`#tc${id}`); }

  switchTo(tabs: ITabsComponent, tabId: number): void {
    for (var i = 1; i <= this.tabs.length; i++) {
      if (tabId === i)	{
        tabs.tabMenu(i).addClass('selected');
        tabs.tabMenu(i).removeClass('unselected');
        tabs.tabContent(i).addClass('show');
        tabs.tabContent(i).removeClass('hide');
      } else {
        tabs.tabMenu(i).addClass('unselected');
        tabs.tabMenu(i).removeClass('selected');
        tabs.tabContent(i).addClass('hide');
        tabs.tabContent(i).removeClass('show');
      }
    }
  }
}
