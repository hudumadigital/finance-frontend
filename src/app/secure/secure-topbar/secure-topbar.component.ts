import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secure-topbar',
  templateUrl: './secure-topbar.component.html',
  styleUrls: ['./secure-topbar.component.css']
})
export class SecureTopbarComponent implements OnInit {
  username: any;
  constructor() { }

  ngOnInit(): void {
    const customer: any = localStorage.getItem('customerData');
    const { username } = JSON.parse(customer) ?
      JSON.parse(customer) : '';
    this.username = username;
  }
}
