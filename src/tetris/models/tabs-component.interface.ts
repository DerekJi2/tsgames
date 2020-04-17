export interface ITabsComponent {
  tabs: JQuery<HTMLElement>;

  tabMenu(id: number): JQuery<HTMLElement>;
  tabContent(id: number): JQuery<HTMLElement>;
  switchTo(tabs: ITabsComponent, tabId: number): void;

}
