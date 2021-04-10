import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { concat, defer, EMPTY, fromEvent, Subscription } from 'rxjs';
import { mergeScan, repeat } from 'rxjs/operators';
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
  baseUrl = 'http://127.0.0.1:4001/list-data?page=';

  constructor() { }

  ngOnInit() {
    this.subscription = this.getItems(2).subscribe(
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

  getItems(prefetchPages: number) {
    const initialData = this.getInitialData(prefetchPages);
    const fetchMoreEvent = fromEvent(this.moreButton.nativeElement, 'click');

    const moreItems = fetchMoreEvent.pipe(
      mergeScan((preAjaxRes, next) => {
          if ('nextIndex' in preAjaxRes.response) {
            return ajax.get(this.baseUrl + preAjaxRes.response.nextIndex)
          }
          return EMPTY;
        },
        { response: { nextIndex: prefetchPages }}, // Initial acc value
        1 // Maximum concurrency, 1 - to prevent race conditions
      )
    )

    return concat(initialData, moreItems);
  }

  getInitialData(prefetchPages: number) {
    let counter = 0;
    return defer(() => ajax.get(this.baseUrl + counter++))
      .pipe(
        repeat(prefetchPages)
      );
  }
}
