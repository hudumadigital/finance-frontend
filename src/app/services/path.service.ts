import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  authUrl = 'http://localhost:5000/account';

  constructor() { }
}
