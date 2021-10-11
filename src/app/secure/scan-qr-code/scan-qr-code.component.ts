import {ChangeDetectorRef, Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-scan-qr-code',
  templateUrl: './scan-qr-code.component.html',
  styleUrls: ['./scan-qr-code.component.css']
})
export class ScanQrCodeComponent implements OnInit {

  public scannerEnabled: boolean = true;

  constructor(private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  public scanSuccessHandler($event: any) {
    this.scannerEnabled = false;
  }

  public enableScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }


}
