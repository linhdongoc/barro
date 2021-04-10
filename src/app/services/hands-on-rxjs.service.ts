import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HandsOnRxjsService {

  constructor() { }

  getCitiesInfo() {
    // return ajax('http://backend.com/get-cities');
    return of({
      London: 25,
      Paris: 30,
      Rome: 35
    }).pipe(
      delay(1000)
    )
  }

  getTaxCoefficients() {
    // return ajax('http://backend.com/get-coefficients');
    return of([1, 1.2, 1.5]).pipe(
      delay(1200)
    )
  }
}
