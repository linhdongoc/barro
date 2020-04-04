import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RECIPE_ROUTES } from './recipe/recipe.routes';
import { DatabindingComponent } from './databinding/databinding.component';
import { ProductListComponent } from './products/product-list/product-list.component';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/rezepte', pathMatch: 'full' },
  { path: 'rezepte', component: RecipeComponent, children: RECIPE_ROUTES },
  { path: 'einkaufsliste', component: ShoppingListComponent },
  { path: 'udemy', component: DatabindingComponent },
  { path: 'productList', component: ProductListComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
