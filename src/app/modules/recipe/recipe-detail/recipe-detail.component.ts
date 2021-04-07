import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from '../../../models/recipe.model';
import {RecipeService} from '../../../services/recipe.service';
import {ShoppingListService} from '../../../services/shopping-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styles: []
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  selectedRecipe: Recipe;
  recipeId: number;

  private subscription: Subscription;

  constructor(
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe( params => {
      this.recipeId = +params['id'];
      this.selectedRecipe = this.recipeService.getRecipeById(this.recipeId);
    });
  }

  onAddToList() {
    this.shoppingListService.addIngredients(this.selectedRecipe.ingredients);
  }

  onEdit() {
    this.router.navigate(['/rezepte', this.recipeId, 'bearbeiten']);
  }

  onDelete() {
    this.recipeService.deleteRecipeById(this.recipeId);
    this.router.navigate(['/rezepte']);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
