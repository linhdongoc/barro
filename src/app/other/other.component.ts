import {Component, ContentChild, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.css']
})
export class OtherComponent {
  @ViewChild('i') input: ElementRef;
  @ContentChild('p') paragraph: ElementRef;

  constructor() {
    setTimeout(() => {
      this.input.nativeElement.value = 'value override!';
      this.paragraph.nativeElement.innerText = 'should be override too!';
    }, 3000);
  }
}
