import { Component, OnInit } from '@angular/core';
import { EMPTY, fromEvent } from 'rxjs';
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
    let repeatStatus = true;
    const pauseBtn = document.querySelector('#pause-btn');

    const pauseBtnClick = () => {
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
    }

    const getData = (timeSec) => ajax.get('http://127.0.0.1:4001/list-retrywhen-data').pipe(
      repeatWhen(notifications => notifications.pipe(
        delay(timeSec * 1000)
      ))
    );

    pauseBtnClick().pipe(
      // tslint:disable-next-line:no-shadowed-variable
      switchMap((repeatStatus) => {
        console.log('repeatStatus: ', repeatStatus);

        if (repeatStatus) {
          return getData(3);
        }

        return EMPTY;
      })
    ).subscribe(
      res => this.updateListView(res), console.warn
    )
  }

  // TODO: not working
  updateListView(res) {
    console.log(res);
    const items = res.response.data;
    const list = document.querySelector('.list-group');
    list.innerHTML = '';
    items.forEach((itemText) => {
      const listItem = document.createElement('li');
      listItem.classList.add('list-group-item');
      listItem.innerHTML = itemText;
      list.append(listItem);
    })
  }
}
