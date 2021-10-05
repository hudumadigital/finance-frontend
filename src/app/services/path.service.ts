import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  path = 'http://localhost:3000';

  constructor() { }
}
