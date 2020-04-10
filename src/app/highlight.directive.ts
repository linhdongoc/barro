import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit {
  @Input() defaultColor = 'white';
  @Input() highlightColor = 'green';
  @HostBinding('style.backgroundColor') color = this.defaultColor;
  @HostListener('mouseenter') mouseenter() {
    this.color = this.highlightColor;
  }
  @HostListener('mouseleave') mouseleave() {
    this.color = this.defaultColor;
  }

  // constructor(elementRef: ElementRef, renderer: Renderer) {
    // elementRef.nativeElement.style.backgroundColor = 'gray';
    // renderer.setElementStyle(elementRef.nativeElement, 'background-color', 'gray');
  // }

  ngOnInit() {
    setTimeout(() => {
      this.color = 'red';
    }, 3000);

    this.color = this.defaultColor;
  }
}
