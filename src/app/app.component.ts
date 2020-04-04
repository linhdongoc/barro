// Recipe Project

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pageTitle = 'Acme Product Management';
}


// Example Project
/*
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1> Inline Template </h1>
    <app-other>
      <p #p>Irgendein text!</p>
    </app-other>
    <app-another>another 1</app-another>
    <app-another>another 3</app-another>
    <app-databinding></app-databinding>
    <app-lifecycle [name]="name" *ngIf="attach"></app-lifecycle>
    <hr>
    <button (click)="name = 'Unicorn'">Name ändern</button>
    <button (click)="attach = false">Zerstören!</button>
    <hr>
    <h1>Attributes Directives</h1>
    <h2>ngClass / ngStyle</h2>
    <div [ngStyle]="{'background-color': color}"></div>
    <hr>
    <h2>Custom Attribute Direction</h2>
    <p appHighlight [defaultColor]="'blue'" [highlightColor]="'gray'">highlight works!</p>
    <hr>
    <h1>Structural Directives</h1>
    <h2>*ngIf</h2>
    <div *ngIf="switch">Nicht immer zu sehen teil1</div>
    <ng-template [ngIf]="switch">
      <div>Nicht immer zu sehen teil2</div>
    </ng-template>
    <button (click)="switch = !switch" class="btn btn-primary">Switch</button>
    <h2>*ngFor</h2>
    <ul>
      <li *ngFor="let item of elemente; let i = index">{{ item }} - (Index: {{ i }})</li>
    </ul>
    <h2>ngSwitch</h2>
    <div [ngSwitch]="value">
      <p *ngSwitchCase="10">10</p>
      <p *ngSwitchCase="100">100</p>
      <p *ngSwitchDefault>other</p>
    </div>
    <hr>
    <h2>UnlessDirective</h2>
    <div *appUnless="switch">Ist das zu sehen?</div>
  `,
  styles: [`
    div {
      width: 100px;
      height: 100px;
    }
  `]
})
export class AppComponent {
  title = 'barro';
  name = 'lifecycle here!';
  attach = true;
  color = 'red';
  switch = true;
  elemente = [1, 2, 3, 4, 5];
  value = 100;
}
*/
