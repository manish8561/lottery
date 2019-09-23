import { Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/common.service';


@Component({
  selector: 'app-front',
  templateUrl: './front-layout.component.html',
  styleUrls: ['./front-layout.component.scss']
})
export class FrontLayoutComponent implements OnInit, OnDestroy {
  public navItems = navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement;
  public isLoggedIn = false;
  constructor(public router: Router, private myservice: CommonService, @Inject(DOCUMENT) _document?: any) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = _document.body.classList.contains('sidebar-minimized');
    });
    this.element = _document.body;
    this.changes.observe(<Element>this.element, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  ngOnInit(): void {
    this.isLoggedIn = this.myservice.isLoggedIn;
  }
  ngOnDestroy(): void {
    this.changes.disconnect();
  }
  logout(){
    this.myservice.logout();
    this.router.navigate(['/login']);
  }
}
