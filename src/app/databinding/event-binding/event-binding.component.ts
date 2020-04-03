import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-event-binding',
  templateUrl: './event-binding.component.html',
  styleUrls: ['./event-binding.component.css']
})
export class EventBindingComponent {
  @Output() clicked = new EventEmitter<string>();
  showBox = false;

  onClick($event: Event) {
    console.log($event);
    this.clicked.emit('neuer text');
  }

  onClick1($event: MouseEvent) {
    console.log($event);
    this.showBox = !this.showBox;
  }
}
