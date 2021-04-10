import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { combineLatest, fromEvent, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, map, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html',
  styleUrls: ['./price.component.scss']
})
export class PriceComponent implements OnInit, OnDestroy {
  value = 0;
  @ViewChild('sendButton', { static: true }) sendButton;
  subscriptions: Subscription[] = [];

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    const button = fromEvent(this.sendButton.nativeElement, 'click');
    const cities = this.store.pipe(
      map((state) => state.cityPrice),
      filter(x => x > 0)
    );
    const coefficients = this.store.pipe(
      map((state) => state.coefficient),
      filter(x => x > 0)
    );

    this.subscriptions[0] = combineLatest(cities, coefficients).subscribe(
      ([cityValue, coefficient]) => {
        this.value = parseInt(cityValue, 10) * parseFloat(coefficient)
      }
    );

    this.subscriptions[1] = button.pipe(withLatestFrom(cities, coefficients)).subscribe(
      ([event, cityValue, coefficient]) => {
        alert('Sending value=' + cityValue + ' and coef=' + coefficient)
      }
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
