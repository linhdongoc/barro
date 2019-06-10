import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-property-binding',
  template: `
    <p>{{ name }}</p>
  `,
  styles: []
})
export class PropertyBindingComponent {
  @Input() name: string;
}
