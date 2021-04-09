import { Component, OnDestroy, OnInit } from '@angular/core';
import { of, Subscription } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-merge-map-demo',
  templateUrl: './merge-map-demo.component.html',
  styleUrls: ['./merge-map-demo.component.scss']
})
export class MergeMapDemoComponent implements OnInit, OnDestroy {
  items: string[] = [];
  subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.subscription = this.getItems(0).subscribe(
      result => {
        this.items = result;
        // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getItems(index, result = []) {
    // http://127.0.0.1:4001/list-data?page=0
    // {"nextIndex":1,"data":[1,2,3,4,5]}

    const baseUrl = 'http://127.0.0.1:4001/list-data?page=';

    return ajax.get(baseUrl + index).pipe(
      mergeMap(
        d => {
          result = result.concat(d.response.data);
          if ('nextIndex' in d.response) {
            return this.getItems(d.response.nextIndex, result);
          }
          return of(result);
        },
        null,
        1
      )
    )
  }
}
