import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { SAVE_COEFFICIENT } from '@app/modules/hands-on-rxjs/coefficient-switcher/coefficient-switcher.reducer';

@Component({
  selector: 'app-coefficient-switcher',
  templateUrl: './coefficient-switcher.component.html',
  styleUrls: ['./coefficient-switcher.component.scss']
})
export class CoefficientSwitcherComponent implements OnInit {
  @Input() coefficientsList: any[];
  activeIndex = 0;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.dispatch({ type: SAVE_COEFFICIENT, payload: this.coefficientsList[0] });
  }

  setCoefficientValue(value, index) {
    this.store.dispatch({ type: SAVE_COEFFICIENT, payload: value });
    this.activeIndex = index;
  }
}
