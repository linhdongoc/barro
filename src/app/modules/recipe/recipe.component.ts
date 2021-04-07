import { Component, OnInit } from '@angular/core';
import { RecipeService } from '@app/services/recipe.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styles: [],
  providers: [RecipeService]
})
export class RecipeComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

}
