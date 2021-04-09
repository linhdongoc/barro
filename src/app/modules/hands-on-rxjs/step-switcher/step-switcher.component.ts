import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UPDATE_STEP } from '@app/modules/hands-on-rxjs/step-switcher/step-switcher.reducer';

@Component({
  selector: 'app-step-switcher',
  templateUrl: './step-switcher.component.html',
  styleUrls: ['./step-switcher.component.scss']
})
export class StepSwitcherComponent implements OnInit {
  step = 1;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {}

  setStepValue(value) {
    this.step = value;
    this.store.dispatch({
      type: UPDATE_STEP,
      payload: value
    })
  }

}
