import {Component, OnDestroy, OnInit} from '@angular/core';
import {map} from 'rxjs/operators';
import {Breakpoints, BreakpointObserver, BreakpointState} from '@angular/cdk/layout';
import {UiService} from '../../services/ui.service';
import {Subscription} from 'rxjs';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  cardLayout = this.breakpointObserver.observe([
    Breakpoints.XSmall,
    Breakpoints.Small,
    Breakpoints.Medium,
    Breakpoints.Large,
    Breakpoints.XLarge
  ]).pipe(
    map((state: BreakpointState) => {
      if (state.breakpoints[Breakpoints.XSmall]) {
        return {
          columns: 1,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 1, rows: 2},
          table: {cols: 1, rows: 4}
        };
      }
      if (state.breakpoints[Breakpoints.Small]) {
        return {
          columns: 2,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 1, rows: 2},
          table: {cols: 2, rows: 4}
        };
      }
      if (state.breakpoints[Breakpoints.Medium]) {
        return {
          columns: 2,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 1, rows: 2},
          table: {cols: 2, rows: 4}
        };
      }
      if (state.breakpoints[Breakpoints.Large]) {
        return {
          columns: 4,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 2, rows: 2},
          table: {cols: 4, rows: 4}
        };
      }
      if (state.breakpoints[Breakpoints.XLarge]) {
        return {
          columns: 4,
          miniCard: {cols: 1, rows: 1},
          chart: {cols: 2, rows: 2},
          table: {cols: 4, rows: 4}
        };
      }
      return
    })
  );
  transfers = 0;
  loadingState = false;
  primary = 0;
  agency = 0;
  totalBalance = 0;
  subscriptions: Subscription[] = [];
  constructor(private breakpointObserver: BreakpointObserver,
              private ui: UiService,
              private walletSerive: WalletService) {}
  ngOnInit(): void {
    this.ui.loadingStateChanged.subscribe(
      loadState => {
        this.loadingState = loadState;
      }
    );
    this.walletSerive.getBalance();
    this.walletSerive.balanceSubject.subscribe(
      (result: any) => {
        this.agency = result.agencyBalance;
        this.primary = result.primaryBalance;
        this.totalBalance = result.totalBalance;
        // this.trasfers = result.tranfers;
      }
    )
    // this.shopService.getNumberOfProducts();
    // this.shopService.getNumberOfOrders();
    // this.subscriptions.push(
    //   this.shopService.productCount.
    //   subscribe(
    //     (count: number) => {
    //       this.numberOfProducts = count;
    //     },
    //     error => {
    //       // console.log(error);
    //     }
    //   )
    // );
    // this.subscriptions.push(
    //   this.shopService.orderCount
    //     .subscribe(
    //       (count: number) => {
    //         this.numberOfOrders = count;
    //       }
    //     )
    // );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
