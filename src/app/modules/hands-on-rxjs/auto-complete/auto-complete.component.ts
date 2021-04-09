import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent implements OnInit, AfterViewInit, OnDestroy {
  items: string[] = [];
  searchText: FormControl = new FormControl('');
  @ViewChild('textInput') input;
  subscription: Subscription;

  constructor(private http: HttpClient) { }

  ngOnInit(): any { }

  ngAfterViewInit() {
    this.subscription = fromEvent(this.input.nativeElement, 'keyup').pipe(
      map(e => (e as any).target.value),
      filter(text => text.length > 2),
      distinctUntilChanged(),
      switchMap(value => this.getWikiSearchResults(value))
    ).subscribe(
      response => {
        console.log('response[1]: ', response[1]);
        this.items = response[1];
      }
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getWikiSearchResults(value) {
    const wikiUrl = 'https://en.wikipedia.org/w/api.php?'
    const params = new HttpParams()
      .set('action', 'opensearch')
      .set('origin', '*')
      .set('format', 'jsonp')
      .set('search', value);
    const searchUrl: string =  wikiUrl + params.toString();

    // TODO: not working
    return this.http.jsonp(searchUrl, 'callback');
  }

  onItemClick(item: string) {
    this.items = [];
    this.input.nativeElement.value = item;
  }
}
