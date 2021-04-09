import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit, OnDestroy {
  counter = 0;
  step = 1;
  clearId: any;

  constructor(private store: Store<any>) { }

  ngOnInit(): void {
    this.store.select(state => state.stepValue).subscribe((stepValue) => this.step = stepValue);
    this.startCounter();
  }

  startCounter() {
    this.clearId = setInterval(() => {
      this.counter = this.counter + this.step;
    }, 1000)
  }

  ngOnDestroy() {
    clearInterval(this.clearId);
  }
}
