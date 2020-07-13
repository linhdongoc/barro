import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../../models/ingredient.model';
import {ShoppingListService} from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: [`
    .shopping-list-link {
      cursor: pointer;
    }
  `]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
  }

}
