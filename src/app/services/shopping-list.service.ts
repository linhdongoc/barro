import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  getIngredients() {
    return this.ingredients;
  }

  addIngredients(ingredients: Ingredient[]) {
    Array.prototype.push.apply(this.ingredients, ingredients);
  }
}
