import {Component, OnInit} from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import {RecipeService} from '../../../services/recipe.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styles: []
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
  }

  onNewRecipe() {
    this.router.navigate(['/rezepte', 'neu']);
  }
}
