import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  url = 'http://localhost:5000';

  constructor() { }
}
