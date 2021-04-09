import { Component, OnDestroy, OnInit } from '@angular/core';
import { defer, empty, from, fromEvent, interval, Observable, Observer, of, pipe, range, Subject, Subscription, throwError, timer } from 'rxjs';
import {
  buffer,
  bufferCount, bufferTime, bufferToggle, bufferWhen,
  catchError,
  debounceTime,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map, mergeAll, mergeMap, mergeMapTo, mergeScan,
  publish,
  publishReplay, scan, switchAll,
  switchMap, switchMapTo,
  take, tap
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-hands-on-rxjs',
  templateUrl: './hands-on-rxjs.component.html',
  styleUrls: ['./hands-on-rxjs.component.scss']
})
export class HandsOnRxjsComponent implements OnInit, OnDestroy {
  dateSubscription: Subscription;
  currentDate: Date;
  currentTime$: Observable<Date>;

  constructor() { }

  ngOnInit(): void {
    // this.createObserver();
    // this.deferObserver();
    // this.timerObserver();
    this.currentTime$ = timer(0, 1000).pipe(map(() => new Date()));
    // this.ofFromObserver();
    this.input1();
    // this.coldHotObserver();
    // this.subjectsObserver();
    // this.randomValuesObserver();
    this.bufferButton();
    // this.bufferObserver();
    // this.switchObserver();
    // this.mergeObserver();

  }

  // Wird die Seite verlassen, wird die Subscription beendet
  ngOnDestroy() {
    this.dateSubscription.unsubscribe();
  }

  createObserver() {
    const observable = Observable.create((observer) => {
      const id = setInterval(() => {
        observer.next('hi');
        observer.complete();
      }, 1000);
    });
    observable.subscribe(
      (res) => console.log(res), // onNext
      (err) => console.warn(err), // onError
      () => console.log('completeHandler') // onComplete
    );

    const observable1 = Observable.create((observer: Observer<number>) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.complete();
    });
    observable1.subscribe(
      (value) => console.log('new value: ', value),
      (error) => console.log('error: ', error),
      () => console.log('completed successfully')
    );

    const randomValues = Observable.create((observer) => {
      const values = setInterval(() => {
        observer.next(Math.random());
      }, 1000);

      return () => {
        clearInterval(values);
      }
    });
    randomValues.subscribe(
      (res) => console.log('random value: ', res), // onNext
      (err) => console.warn('random error', err), // onError
      () => console.log('completeHandler') // onComplete
    );
  }

  deferObserver() {
    function ObservableFactory(n) {
      return of(n)
    }
    let counter = 0;
    const source = defer(() => ObservableFactory(counter++));
    source.subscribe(
      (data) => console.log('1: ', data)
    );
    source.subscribe(
      (data) => console.log('2: ', data)
    );
  }

  timerObserver() {
    this.dateSubscription = timer(0, 1000)
      .pipe(
        map(() => new Date())
      ).subscribe(value => {
        this.currentDate = value;
        console.log(this.currentDate);
      });
  }

  ofFromObserver() {
    const source = of([1, 2], 3);
    // const source = from([1, 2]);
    // const source = from(Promise.resolve(4));
    // const source = from(of(4, 5))

    const subscription = source.subscribe(
      data => console.log('next Value: ', data)
    )
    setTimeout(() => {
      subscription.unsubscribe();
    }, 5000)
  }

  input1() {
    const inputElement = document.querySelector('#myinput');
    const inputTarget = fromEvent(inputElement, 'keyup').pipe(
      map(e => (e as any).target.value),
      debounceTime(750)
    ).subscribe(
      (res) => console.log(res),
      (err) => console.warn(err),
      () => console.log('completeHandler')
    );
    setTimeout(() => {
      inputTarget.unsubscribe();
    }, 5000)
  }

  coldHotObserver() {
    const source$ = interval(1000).pipe(take(2))
    // const source$ = interval(1000).pipe(take(3), publish());
    // const source$ = interval(1000).pipe(take(3), publishReplay(3));

    // source$.connect();
    source$.subscribe((data) => console.log('Observer 1: ', data));
    setTimeout(() => {
      source$.subscribe((data) => console.log('Observer 2: ', data));
    }, 2500)
  }

  subjectsObserver() {
    const source$ = new Subject();
    // let source$ = new BehaviorSubject(-1); // -1 is initial value
    // let source$ = new ReplaySubject(3);
    // let source$ = new AsyncSubject();

    let counter = 0;

    const clearId = setInterval(() => {
      console.log('source$ value', counter);
      source$.next(counter++);
    }, 1000);

    source$.subscribe((data) => console.log('Observer 1: ', data));

    setTimeout(() => {
      source$.subscribe((data) => console.log('Observer 2: ', data));
    }, 2500);

    setTimeout(() => {
      source$.complete();
      clearInterval(clearId);
    }, 5000);
  }

  randomValuesObserver() {
    const randomValues = Observable.create((observer) => {
      const interval1 = setInterval(() => {
        observer.next(Math.random());
      }, 1000);
      return () => {
        clearInterval(interval1);
      }
    });

    randomValues.subscribe(
      value => console.log('Subscription 1: ', value)
    );

    randomValues.subscribe(
      value => console.log('Subscription 2: ', value)
    );

    const randomValuesSubject = new Subject();
    setInterval(() => {
      randomValuesSubject.next(Math.random());
    }, 1000);

    randomValuesSubject.subscribe(
      value => console.log('Subscription A: ', value)
    );

    randomValuesSubject.subscribe(
      value => console.log('Subscription B: ', value)
    );
  }

  mapFilterCatchObserver() {
    const doubleValue = map(value => Number(value) * 2);
    const filterMoreThen5 = filter(x => x <= 5);
    const customOperator = pipe(
      doubleValue,
      filterMoreThen5
    );
    const source = range(0, 10);
    source.pipe(customOperator).subscribe(data => console.log(data));

    interval(500).pipe(
      take(4),
      map(x => {
        if (x === 2) throw { code: 404, message: 'not found' }
        return x;
      }),
      catchError(err => of(100))
    ).subscribe(
      data => console.log('onNext: ', data),
      err => console.log('onError: ', err)
    );
  }

  distanctObserver() {
    from([1, 2, 3, 4, 4, 4, 5]).pipe(
      distinctUntilChanged()
    ).subscribe(
      data => console.log('distinct values: ', data),
      err => console.log('distinct error: ', err)
    );

    from([{v:1}, {v:2}, {v:2}, {v:3}]).pipe(
      // distinctUntilChanged()
      // distinctUntilChanged((prev, next) => prev.v === next.v)
      // distinctUntilChanged(null, (item) => item.v)
      // distinct((item) => item.v)
      distinctUntilKeyChanged('v')
    ).subscribe(
      data => console.log('distinct values: ', data),
      err => console.log('distinct error: ', err)
    );

    from([{v:1}, {v:2}, {v:2}, {v:3}, {v:2}]).pipe(
      // distinct((item) => item.v)
      distinctUntilKeyChanged('v')
    ).subscribe(
      data => console.log('distinct values: ', data),
      err => console.log('distinct error: ', err)
    );
  }

  scanObserver() {
    from([1,2,3,4,5]).pipe(
      scan((acc, next) => acc + next, 0),
      map((x, index) => x / (index + 1))
    ).subscribe(
      data => console.log('onNext: ', data),
      err => console.log('onError: ', err)
    )
  }

  bufferButton() {
    const bufferButton = document.querySelector('#my-buffer-button');
    const clicks = fromEvent(bufferButton, 'click');
    const source = interval(1000);
    source.pipe(
      buffer(clicks)
    ).subscribe(data => console.log(data));
  }

  bufferObserver() {
    const startInterval = interval(5000); // emit value every 5 seconds
    // const closingInterval = () => interval(3000); // emit value after 3s
    let counter = 0;
    const closingInterval = () => (counter++ % 2) ? interval(3000) : empty();

    timer(0, 1000).pipe(
      // bufferCount(2,2)
      // bufferCount(3,2)
      // bufferCount(2,3)
      // bufferTime(3000)
      // buffer(interval(3000))
      // bufferWhen(() => interval(1000 + Math.random() * 4000))
      bufferToggle(startInterval, closingInterval) // every 5s a new buffer will start, collecting values for 3s and emit
    ).subscribe(
      data => console.log('onNext: ', data),
      err => console.log('onError: ', err)
    );
  }

  switchObserver() {
    const url1 = 'http://127.0.0.1:4001/list-data?page=0';  // {"nextIndex":1,"data":[1,2,3,4,5]}
    const url2 = 'http://127.0.0.1:4001/list-data?page=1';  // {"nextIndex":2,"data":[6,7,8,9,10]}
    const url3 = 'http://127.0.0.1:4001/list-data?page=2';  // {"nextIndex":3,"data":[11,12,13,14,15]}
    const url4 = 'http://127.0.0.1:4001/list-data?page=3';  // {"data":[16,17,18,19,20]}
    const url5 = 'http://127.0.0.1:4001/list-data?page=4';  // {"data":[21,22,23,24,25]}
    const url6 = 'http://127.0.0.1:4001/list-data?page=5';  // {"data":[26,27,28,29,30]}
    const url7 = 'http://127.0.0.1:4001/list-data?page=6';  // {"data":[31,32,33,34,35]}

    // from([url1, url2, url3]).pipe(
    //   map(url => ajax(url))
    // ).subscribe(
    //   innerObservable => {
    //     innerObservable.subscribe(
    //       obs => console.log(obs.response.data)
    //       //
    //     )
    //   }
    // )

    // from([10,40,50]).pipe(
    //   // switchMap(num => interval(num * 1000))
    //   switchMapTo(interval(1000))
    // ).subscribe(
    //   data => console.log('onNext: ', data),
    //   err => console.log('onError: ', err)
    // );

    // from([url1, url2, url3]).pipe(
    //   map(url => ajax(url)),
    //   switchAll()
    //
    //   // switchMap(url => ajax(url))
    //   switchMapTo(ajax(url6))
    // ).subscribe(
    //   res => console.log('onNext: ', res.response.data), // [11, 12, 13, 14, 15]
    //   err => console.log('onError: ', err)
    // )
  }

  mergeObserver() {
    const url1 = 'http://127.0.0.1:4001/list-data?page=0';  // {"nextIndex":1,"data":[1,2,3,4,5]}
    const url2 = 'http://127.0.0.1:4001/list-data?page=1';  // {"nextIndex":2,"data":[6,7,8,9,10]}
    const url3 = 'http://127.0.0.1:4001/list-data?page=2';  // {"nextIndex":3,"data":[11,12,13,14,15]}
    const url4 = 'http://127.0.0.1:4001/list-data?page=3';  // {"data":[16,17,18,19,20]}
    const url5 = 'http://127.0.0.1:4001/list-data?page=4';  // {"data":[21,22,23,24,25]}
    const url6 = 'http://127.0.0.1:4001/list-data?page=5';  // {"data":[26,27,28,29,30]}
    const url7 = 'http://127.0.0.1:4001/list-data?page=6';  // {"data":[31,32,33,34,35]}

    from([url1, url2, url3]).pipe(
      // map(url => ajax(url)),
      // mergeAll()

      // mergeMap(url => ajax(url))

      // mergeMap(url => ajax(url), null, 1)

      // mergeMapTo(ajax(url7))
      mergeScan((acc, url) => ajax(url), null, 1)
    ).subscribe(
      obs => console.log('onNext: ', obs.response.data),
      err => console.log('onError: ', err)
    )
  }
}
