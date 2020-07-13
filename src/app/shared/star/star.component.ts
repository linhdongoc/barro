import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss']
})
export class StarComponent implements OnChanges {
  starWidth: number;
  @Input() rating: number; // parameter
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  @Output() ratingClicked: EventEmitter<string> = new EventEmitter<string>();

  ngOnChanges(): void {
    this.starWidth = this.rating * 75 / 5;
    console.log('OnChanges');
  }

  onClick(): void {
    console.log(this.rating);
    this.ratingClicked.emit(`${this.rating}`);
  }
}
