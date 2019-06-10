import { Component} from '@angular/core';

@Component({
  selector: 'app-databinding',
  templateUrl: './databinding.component.html',
  styles: [`
    .red-border {
      border: 1px solid darkred;
    }
  `]
})
export class DatabindingComponent {
  title = 'Title';
  id = 1;
  attachClass = false;

  constructor() {
    setTimeout(() => {
      this.id += 200;
      this.attachClass = true;
    }, 3000);
  }

  onClick(event: Event) {
    alert('clicked!');
    console.log(event);
  }
}
