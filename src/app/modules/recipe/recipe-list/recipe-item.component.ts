import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '@app/models/recipe.model';
import { RecipeService } from '@app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styles: [`
    .recipe-item-img {
      max-height: 50px;
    }
    `]
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  @Input() recipeId: number;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {}
}
