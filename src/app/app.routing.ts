import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RECIPE_ROUTES } from './recipe/recipe.routes';
import { DatabindingComponent } from './databinding/databinding.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailGuard } from './products/product-detail/product-detail.guard';

const APP_ROUTES: Routes = [
  { path: '', redirectTo: '/rezepte', pathMatch: 'full' },
  { path: 'rezepte', component: RecipeComponent, children: RECIPE_ROUTES },
  { path: 'einkaufsliste', component: ShoppingListComponent },
  { path: 'udemy', component: DatabindingComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:id',
    canActivate: [ProductDetailGuard],
    component: ProductDetailComponent
  },
  { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
