import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { ContentNavigation } from '../../Model/contentnavigation.model';
import { ActivatedRoute, Router, NavigationStart, NavigationEnd } from '@angular/router';
import { RedirectionService } from '../../Service/redirection.service';

@Component({
  selector: 'old-header-subnavigation-component',
  templateUrl: './subnavigation.component.html',
  providers: [RedirectionService],
  styles: [
    `li .navigation__list-item > a{
      padding-right: 20px
    }`
  ]
})
export class OldSubNavigationComponent implements OnInit {
  @Input() NavigationInfo: any;
  @Input() SelectedMenu: any;
  @Input() GlobalNavigationInfo: any;
  @Output() OnMobileMenuSelect: EventEmitter<any> = new EventEmitter();
  RemainingParentMenu: any;
  menu: string;
  Data: any;
  public activeMenu = '';
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _redirectionService: RedirectionService) {
    this.Data = null;
  }

  ls_subnavObj: object;
  ls_currSubNavObj: any;
  isActiveSubNav: boolean;
  currentUrl: string;

  handleUrlChange(url) {
    this.currentUrl = url.toLowerCase();
    const urlChunks = this.currentUrl.split('/') || [];
    urlChunks.splice(0, 1);
    this.currentUrl = urlChunks.join('/');
  }

  subscribeUrlChange() {
    this.currentUrl = '';
    this._router
      .events
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          console.log('started', `${event}`);
        }
        if (event instanceof NavigationEnd) {
          console.log('ended', `${event}`);
          this.currentUrl = event.url;
          this.handleUrlChange(this.currentUrl);
        }
      });
  }

  ngOnInit() {
    this.subscribeUrlChange();
    if (!this.NavigationInfo) { return; }
    this.menu = this.SelectedMenu;
    this.Data = this.NavigationInfo[0].below; 
    this.RemainingParentMenu = this.FindParentNavigationMenu(this.SelectedMenu);
    this.currentUrl = this._router.routerState.snapshot.url.toLowerCase();
    this.handleUrlChange(this.currentUrl);
  }

  isPartOfCurrentUrl(item) {
    if (!item) { return false; }
    const parentUrl = !item.external ? item.alias : item.absolute;
    if (this.currentUrl.indexOf(parentUrl) > -1) {
      return true;
    } else {
      return false;
    }
  }

  // this method is to highlight active tab
  highlightedMenu(item) {
    if (item.title) {
      this.activeMenu = item.title;
      this.isActiveSubNav = true;
      if (typeof (Storage) !== 'undefined') {
        localStorage.removeItem('ls_subnav');
        this.ls_subnavObj = { activeMenu: this.activeMenu, 'currentURL': item.alias };
        localStorage.setItem('ls_subnav', JSON.stringify(this.ls_subnavObj));
        this.ls_currSubNavObj = JSON.parse(localStorage.ls_subnav);
      } else {
        console.log('It seems.. Web storage not supported by your browser');
      }
    }
  }

  private FindParentNavigationMenu(selectedMenu: string) {

    const resultFirstLink = this.GlobalNavigationInfo.filter((item, index) => {
      return (item.title.trim() === selectedMenu);
    });
    const resultSecondLink = this.GlobalNavigationInfo.filter((item, index) => {
      return (item.title.trim() !== selectedMenu);
    });
    const result = [];
    result.push(resultFirstLink[0]);
    result.push(resultSecondLink[0]);
    return result;
  }

  public ManageContentNavigation(data: any) {
    this.ManageToggle();
    const obj = new ContentNavigation().ManagePageRedirection(data);
    this._redirectionService.HandleNavigation(obj, this._router, this._activatedRoute);
  }

  public ManageParentMenu(data: any) {
    this.OnMobileMenuSelect.emit(data);
  }

  public ManageToggle() {
    if (typeof document !== 'undefined') {
      const toggleState = document.getElementById('togglenavigation');
      const toggleImage = document.getElementById('toggleimage');
      const secElementState = document.getElementById('sec-wrapper-navigation');

      if (toggleState && toggleState.className === 'c-navigation--default is-open') {
        document.getElementById('togglenavigation').className = 'c-navigation--default';
      }
      if (toggleImage && toggleImage.className === 'burger is-active') {
        document.getElementById('toggleimage').className = 'burger';
      }
      if (secElementState && secElementState.className === 'c-sec-navigation--default is-menu-open') {
        document.getElementById('sec-wrapper-navigation').className = 'c-sec-navigation--default';
      }

      // reset the classes to fix scroll issue for mobile view (has-no-scroll)
      document.getElementsByTagName('html')[0].className = 'no-js';
      document.getElementsByTagName('body')[0].className = '';
    }
  }

  public defaultOnClick() {
    return false;
  }
}
