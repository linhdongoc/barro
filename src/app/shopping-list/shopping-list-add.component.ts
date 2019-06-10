import { Component, OnInit } from '@angular/core';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styles: []
})
export class ShoppingListAddComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {}

}
