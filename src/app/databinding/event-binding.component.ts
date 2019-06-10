import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-event-binding',
  template: `
    <p>
      event-binding works!
    </p>
    <div (click)="onClick()"></div>
  `,
  styles: [`
    div {
      width: 100px;
      height: 100px;
      background-color: lightskyblue;
    }
  `]
})
export class EventBindingComponent {
  @Output() clicked = new EventEmitter<string>();
  onClick() {
    this.clicked.emit('neuer text');
  }
}
