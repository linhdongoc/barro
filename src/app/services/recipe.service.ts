import {Recipe} from '../models/recipe.model';
import {Ingredient} from '../models/ingredient.model';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Schnitzel', 'loremipsum', 'https://picsum.photos/id/237/300/200',
      [new Ingredient('Schweinespeck', 500), new Ingredient('Papaya', 3)]),
    new Recipe('Salat', 'loremipsum', 'https://picsum.photos/id/238/300/200',
      []),
  ];

  getRecipes() {
    return this.recipes;
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  deleteRecipeById(id: number) {
    this.recipes.splice(id, 1);
  }
}
