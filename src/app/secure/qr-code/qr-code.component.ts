import { Component, OnInit } from '@angular/core';
import {PathService} from "../../services/path.service";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  email = ''
  transferPath = '';

  constructor(
    private path: PathService,) { }

  ngOnInit(): void {
    const {email}  = JSON.parse(<string>localStorage.getItem('customer')) ?
      JSON.parse(<string>localStorage.getItem('customer')) : '';
    this.email = email;
    this.transferPath = this.path.transferPath + '?q=' + this.email;
    console.log(this.transferPath);
  }

}
