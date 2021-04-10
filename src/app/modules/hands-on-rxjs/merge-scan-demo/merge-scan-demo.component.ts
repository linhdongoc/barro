import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EMPTY, fromEvent, Subscription } from 'rxjs';
import { mergeScan } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-merge-scan-demo',
  templateUrl: './merge-scan-demo.component.html',
  styleUrls: ['./merge-scan-demo.component.scss']
})
export class MergeScanDemoComponent implements OnInit, OnDestroy {
  items: number[] = [1,2,3,4,5];
  @ViewChild('moreButton', { static: true }) moreButton: ElementRef;
  disableMoreButton = false;
  subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.getItems().subscribe(
      (result: any) => {
        this.items = this.items.concat(result.response.data);
        if (!('nextIndex' in result.response)) {
          this.disableMoreButton = true;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getItems() {
    const baseUrl = 'http://127.0.0.1:4001/list-data?page=';
    const fetchMoreEvent = fromEvent(this.moreButton.nativeElement, 'click');

    return fetchMoreEvent.pipe(
      mergeScan((preAjaxRes, next) => {
          if ('nextIndex' in preAjaxRes.response) {
            return ajax.get(baseUrl + preAjaxRes.response.nextIndex)
          }
          return EMPTY;
        },
        { response: { nextIndex: 1 }}, // Initial acc value
        1 // Maximum concurrency, 1 - to prevent race conditions
      )
    );
  }
}
