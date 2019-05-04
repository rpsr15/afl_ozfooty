import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar-cmp',
  templateUrl: './navbar-cmp.component.html',
  styleUrls: ['./navbar-cmp.component.css']
})
export class NavbarCmpComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isCollapsed:boolean = true;

  toggleCollapse(): void {
    console.log('cc');
    this.isCollapsed = !this.isCollapsed;
  }
}
