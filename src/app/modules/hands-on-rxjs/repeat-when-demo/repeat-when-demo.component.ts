import { Component, OnInit } from '@angular/core';
import { EMPTY, fromEvent, pipe, Subscription } from 'rxjs';
import { delay, map, repeatWhen, startWith, switchMap, tap } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-repeat-when-demo',
  templateUrl: './repeat-when-demo.component.html',
  styleUrls: ['./repeat-when-demo.component.scss']
})
export class RepeatWhenDemoComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    const list = document.querySelector('.list-group-1');

    const pauseBtnClick$ = (() => {
      let repeatStatus = true;
      const pauseBtn = document.querySelector('.pause-btn');
      return fromEvent(pauseBtn, 'click').pipe(
        map(() => {
          repeatStatus = !repeatStatus;
          return repeatStatus;
        }),
        // tslint:disable-next-line:no-shadowed-variable
        tap((repeatStatus) => {
          pauseBtn.innerHTML = repeatStatus ? 'Pause' : 'Resume';
          pauseBtn.classList.toggle('btn-danger');
          pauseBtn.classList.toggle('btn-success');
        }),
        startWith(true)
      );
    })()

    const getData = (timeSec) => ajax.get('http://127.0.0.1:4001/list-retrywhen-data')
      .pipe(
        repeatWhen((notification) => notification.pipe(
          delay(timeSec * 1000)
          )
        ))

    const repetableObservable$ = getData(3);

    const result$ = pauseBtnClick$.pipe(
      switchMap((repeatStatus) => {
        console.log('repeatStatus ', repeatStatus);
        if (repeatStatus) {
          return repetableObservable$
        }
        return EMPTY;
      })
    )

    result$.subscribe(
      (response) => updateListView(response),
      console.warn
    )

    function updateListView(response) {
      console.log(response.response.data);
      const items  = response.response.data;
      list.innerHTML = ''
      items.forEach((itemText) => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.innerHTML = itemText;
        list.append(listItem);
      })
    }
  }
}
