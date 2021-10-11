import {Component, OnInit} from '@angular/core';
import {PathService} from "../../services/path.service";
import {NgxQrcodeElementTypes, NgxQrcodeErrorCorrectionLevels} from "ngx-qrcode2";

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.css']
})
export class QrCodeComponent implements OnInit {

  email!: string;
  title = 'generate-qrcode';
  elementType:  NgxQrcodeElementTypes.URL | NgxQrcodeElementTypes.CANVAS | NgxQrcodeElementTypes.IMG = NgxQrcodeElementTypes.URL;
  correctionLevel = NgxQrcodeErrorCorrectionLevels.HIGH;
  value!: string;
  href!: string;

  constructor(
    private path: PathService,) { }

  ngOnInit(): void {
    const {email}  = JSON.parse(<string>localStorage.getItem('customer')) ?
      JSON.parse(<string>localStorage.getItem('customer')) : '';
    this.email = email;
    this.value = this.path.transferPath + '?q=' + this.email;
  }

  downloadImage(){
    this.href = document.getElementsByTagName('img')[1].src;
  }

}
