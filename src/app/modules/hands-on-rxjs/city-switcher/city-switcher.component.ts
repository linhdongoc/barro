import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SAVE_CITY_PRICE } from '@app/modules/hands-on-rxjs/city-switcher/city-switcher.reducer';

@Component({
  selector: 'app-city-switcher',
  templateUrl: './city-switcher.component.html',
  styleUrls: ['./city-switcher.component.scss']
})
export class CitySwitcherComponent implements OnInit {
  Object = Object;
  activeIndex = 0;
  @Input() citiesObject: any;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    const firstCity = Object.keys(this.citiesObject)[0];
    const value = this.citiesObject[firstCity];
    this.store.dispatch({ type: SAVE_CITY_PRICE, payload: value });
  }

  cityClick(value, index) {
    this.activeIndex = index;
    this.store.dispatch({ type: SAVE_CITY_PRICE, payload: value });
  }

}
