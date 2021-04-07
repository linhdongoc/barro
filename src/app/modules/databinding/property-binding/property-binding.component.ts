import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-property-binding',
  templateUrl: './property-binding.component.html',
  styleUrls: ['./property-binding.component.scss']
})
export class PropertyBindingComponent {
  title = 'Title PropertyBinding';
  id = 2;
  attachClass = false;
  @Input() name: string;

  constructor() {
    setTimeout(() => {
      this.id += 2;
      this.attachClass = true;
    }, 3000);
  }
}
