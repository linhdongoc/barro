import { Component } from '@angular/core';

@Component({
  selector: 'app-another',
  template: `
    <p>
      another works!
    </p>
    <hr>
    <ng-content></ng-content>
    <p>another 2</p>
    <ng-content></ng-content>
  `,
  styles: [`
  p {
    color: coral;
  }
  `]
})
export class AnotherComponent {
}
