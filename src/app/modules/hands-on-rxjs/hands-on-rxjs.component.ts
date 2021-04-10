import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest, concat,
  defer,
  empty, forkJoin,
  from,
  fromEvent,
  interval,
  Observable,
  Observer,
  of,
  pipe,
  range,
  Subject,
  Subscription,
  throwError,
  timer,
  zip
} from 'rxjs';
import {
  buffer,
  bufferCount, bufferTime, bufferToggle, bufferWhen,
  catchError, concatAll,
  debounceTime, delay,
  distinct,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  filter,
  map, mergeAll, mergeMap, mergeMapTo, mergeScan,
  publish,
  publishReplay, repeat, retry, retryWhen, scan, switchAll,
  switchMap, switchMapTo,
  take, tap, withLatestFrom
} from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';
import { HandsOnRxjsService } from '@app/services/hands-on-rxjs.service';

@Component({
  selector: 'app-hands-on-rxjs',
  templateUrl: './hands-on-rxjs.component.html',
  styleUrls: ['./hands-on-rxjs.component.scss']
})
export class HandsOnRxjsComponent implements OnInit, OnDestroy {
  dateSubscription: Subscription;
  currentDate: Date;
  currentTime$: Observable<Date>;
  url1 = 'http://127.0.0.1:4001/list-data?page=0';  // {"nextIndex":1,"data":[1,2,3,4,5]}
  url2 = 'http://127.0.0.1:4001/list-data?page=1';  // {"nextIndex":2,"data":[6,7,8,9,10]}
  url3 = 'http://127.0.0.1:4001/list-data?page=2';  // {"nextIndex":3,"data":[11,12,13,14,15]}
  url4 = 'http://127.0.0.1:4001/list-data?page=3';  // {"data":[16,17,18,19,20]}
  url5 = 'http://127.0.0.1:4001/list-data?page=4';  // {"data":[21,22,23,24,25]}
  url6 = 'http://127.0.0.1:4001/list-data?page=5';  // {"data":[26,27,28,29,30]}
  url7 = 'http://127.0.0.1:4001/list-data?page=6';  // {"data":[31,32,33,34,35]}
  widgetsVisibility = false;
  citiesObject: any = {};
  coefficientsList: number[] = [];

  constructor(private handsOnRxjsService: HandsOnRxjsService) {
  }

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
    // this.concatObserver();
    this.composingObserver();
    // this.forkJoinObserver();
    // this.retryObserver();
    // this.repeatObserver();


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
        if (x === 2) throw {code: 404, message: 'not found'}
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

    from([{v: 1}, {v: 2}, {v: 2}, {v: 3}]).pipe(
      // distinctUntilChanged()
      // distinctUntilChanged((prev, next) => prev.v === next.v)
      // distinctUntilChanged(null, (item) => item.v)
      // distinct((item) => item.v)
      distinctUntilKeyChanged('v')
    ).subscribe(
      data => console.log('distinct values: ', data),
      err => console.log('distinct error: ', err)
    );

    from([{v: 1}, {v: 2}, {v: 2}, {v: 3}, {v: 2}]).pipe(
      // distinct((item) => item.v)
      distinctUntilKeyChanged('v')
    ).subscribe(
      data => console.log('distinct values: ', data),
      err => console.log('distinct error: ', err)
    );
  }

  scanObserver() {
    from([1, 2, 3, 4, 5]).pipe(
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
    // from([this.url1, this.url2, this.url3]).pipe(
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

    from([this.url1, this.url2, this.url3]).pipe(
      // map(url => ajax(url)),
      // switchAll()  // [Observable1, Observable2, Observable3]

      switchMap(url => ajax(url)) // Observable3

      // switchMapTo(ajax(this.url6)) // Observable6
    ).subscribe(
      res => console.log('onNext: ', res.response.data), // [11, 12, 13, 14, 15]
      err => console.log('onError: ', err)
    )
  }

  mergeObserver() {
    // from([this.url1, this.url2, this.url3]).pipe(
    //   // map(url => ajax(url)),
    //   // mergeAll()
    //
    //   // mergeMap(url => ajax(url))
    //
    //   // mergeMap(url => ajax(url), null, 1)
    //
    //   // mergeMapTo(ajax(this.url7))
    //   mergeScan((acc, url) => ajax(url), null, 1)
    // ).subscribe(
    //   obs => console.log('onNext: ', obs.response.data),
    //   err => console.log('onError: ', err)
    // )

    const getItemsIds = () => of([1, 2, 3, 4, 5, 6, 7, 8]); // emits whole array as one value [1,2,3,4,5,6,7,8]
    // getItemsIds().pipe(
    //   mergeAll()
    // ).subscribe(
    //   obs => console.log('onNext: ', obs), // emits each item as separate value 1..2..3..4..5..6..7..8
    //   err => console.log('onError: ', err)
    // )

    const deleteFromDB = (chuckIds) => {
      console.log('Ids to delete: ', chuckIds);
      // return ajax.post('http://some_url/delete', { id })
      return of({success: true, ids: chuckIds})
    }
    getItemsIds().pipe(
      mergeAll(), // emits one by one 1..2..3..4....8
      bufferCount(2,2), // emits [1,2], [3,4] ... [7,8]
      mergeMap(chunckIds => deleteFromDB(chunckIds))
    ).subscribe(
      obs => console.log('Deleted data: ', obs),
      err => console.log('onError: ', err)
    )
  }

  concatObserver() {
    from([this.url1, this.url2, this.url3]).pipe(
      map(url => ajax(url)),
      concatAll()
    ).subscribe(
      obs => console.log('onNext: ', obs.response.data),
      err => console.log('onError: ', err)
    )
  }

  composingObserver() {
    // const age$ = of(27, 25, 29);
    // const name$ = of('Foo', 'Bar', 'Beer');
    // const isDev$ = of(true, true, false)
    //
    // zip(age$, name$, isDev$).pipe(
    //   map((age, name, isDev) => ({ age, name, isDev }))
    // ).subscribe(
    //   obs => console.log('onNext: ', obs),
    //   err => console.log('onError: ', err)
    // )

    // let counter1 = 0;
    // let counter2 = 10;
    // const observable1 = interval(800).pipe(
    //   map(() => {
    //     console.log('Source1: ', counter1);
    //     return counter1++;
    //   }),
    //   take(2)
    // ); // emits 0..1
    // const observable2 = interval(1000).pipe(
    //   map(() => {
    //     console.log('Source2: ', counter2);
    //     return counter2++;
    //   }),
    //   take(2)
    // ); // emits 10..11
    // combineLatest(observable1, observable2).subscribe(
    //   value => console.log('combine latest emits: ', value)
    // )

    const citiesObject = this.handsOnRxjsService.getCitiesInfo();
    const coefficientsList = this.handsOnRxjsService.getTaxCoefficients();
    zip(citiesObject, coefficientsList)
      .pipe(take(1))
      .subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        ([citiesObject, coefficientsList]) => {
          this.widgetsVisibility = true;
          this.citiesObject = citiesObject;
          this.coefficientsList = coefficientsList;
        }
      )
  }

  forkJoinObserver() {
    forkJoin(
      interval(1000).pipe(take(3)), // emit 0, 1, 2 every second and complete
      interval(500).pipe(take(4)),  // emti 0, 1, 2, 3 every half a second and complete
    ).subscribe(
      obs => console.log('onNext: ', obs),
      err => console.log('onError: ', err),
      () => console.log('This is how it ends!')
    )
  }

  retryObserver() {
    const getData = () => ajax('http://127.0.0.1:4001/list-retry-data').pipe(
      retry(4)
    );
    getData().subscribe(
      (data) => console.log('onNext: ', data.response), console.warn
    );

    const getData1 = (counter) => ajax('http://127.0.0.1:4001/list-retrywhen-data').pipe(
      retryWhen(
        error => {
          // return error.pipe(
          //   delay(1000),
          //   take(counter),
          //   // concat(throwError('Sorry, there was an error (after '+ counter +' retries)'))
          // )

          console.log('retryWhen callback run: ');
          return error.pipe(
            mergeMap((errorMsg, index) => {
              console.log('index = ', index);

              if (errorMsg.statusCode === 501) {
                return of(1).pipe(delay(1000 * (index + 1)));
              }

              return throwError({error: 'Not reachable!'});
            }),
            take(counter),
            // concat(throwError({error: 'Still not reachable after ' + counter + ' retries' }))
          )
        }
      )
    );

    getData1(5).subscribe(
      (data) => console.log('onNext handler run: ', data.response),
      (error) => console.warn('Error handler run: ', error)
    )
  }

  repeatObserver() {
    let counter = 0;
    const getData = () => defer(() => ajax('http://127.0.0.1:4001/list-data?page=' + counter++ ))

    getData().pipe(
      repeat(2)
    ).subscribe(
      (data) => console.log(data.response), console.warn
    )
  }
}
