import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  // authUrl = 'http://localhost:5000/account';
  bankPath = 'http://localhost:5000/bank';

  authUrl = "https://financetz.herokuapp.com/account";
  // bankPath = "https://financetz.herokuapp.com/bank";

  transferPath = '  http://localhost:4200/customer/transfers';

  constructor() { }
}
