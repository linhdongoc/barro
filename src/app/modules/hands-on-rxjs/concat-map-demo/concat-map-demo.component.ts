import { Component, OnDestroy, OnInit } from '@angular/core';
import { forkJoin, Observable, of, Subject, Subscription } from 'rxjs';
import { concatMap, delay, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-concat-map-demo',
  templateUrl: './concat-map-demo.component.html',
  styleUrls: ['./concat-map-demo.component.scss']
})
export class ConcatMapDemoComponent implements OnInit , OnDestroy {
  items: any[];
  deleteSubject = new Subject();
  deleteItems: Observable<any>;
  subscription: Subscription;

  constructor() { }

  ngOnInit(): void {
    this.items = [
      { id: 1, value: 'item1' },
      { id: 2, value: 'item2' },
      { id: 3, value: 'item3' },
    ];

    this.deleteItems = this.deleteSubject.asObservable().pipe(
      // mergeMap(
      concatMap(
        (id, index) => {
          if (index === 1) {
            return this.deleteItem(id).pipe(delay(2000))
          }
          return this.deleteItem(id)
        },
        null // selector function - we don't need it here.
      )
    );
    // mergeMap => click 1-2-3 => remove 1..3..2
    // concatMap => click 1-2-3 => remove 1..2..3

    this.subscription = this.deleteItems.subscribe(
      res => {
        const index = this.items.findIndex((item) => res.id === item.id);
        this.items.splice(index, 1);
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  deleteItem(id) {
    // return ajax.post(deleteUrl, headers, {id})
    return of({success: true, id}).pipe(
      delay(2000)
    )
  }

  deleteAllClick() {
    const ids = this.items.map(item => item.id);
    const arrayOfObservables = ids.map(id => this.deleteItem(id));

    forkJoin(arrayOfObservables).subscribe(
      res => {
        res.forEach((response) =>{
          const index = this.items.findIndex((item) => response.id === item.id);
          this.items.splice(index, 1);
        });
      }
    )
  }
}
