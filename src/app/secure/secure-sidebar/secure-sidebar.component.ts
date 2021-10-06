import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-secure-sidebar',
  templateUrl: './secure-sidebar.component.html',
  styleUrls: ['./secure-sidebar.component.css']
})
export class SecureSidebarComponent implements OnInit {

  @Output() closeSideNav = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onCloseSidebar() {
    this.closeSideNav.emit(true);
  }

}
