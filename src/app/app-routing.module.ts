import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './modules/recipe/recipe.component';
import { ShoppingListComponent } from './modules/shopping-list/shopping-list.component';
import { RECIPE_ROUTES } from './modules/recipe/recipe.routes';
import { DatabindingComponent } from './modules/databinding/databinding.component';
import { ProductListComponent } from './modules/products/product-list/product-list.component';
import { ProductDetailComponent } from './modules/products/product-detail/product-detail.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { ProductDetailGuard } from './guards/product-detail.guard';
import { UserSettingsFormComponent } from './modules/user-settings-form/user-settings-form.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { ProductEditComponent } from './modules/products/product-edit/product-edit.component';
import { ProductEditGuard } from './guards/product-edit.guard';

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
  {
    path: 'products/:id/edit',
    canDeactivate: [ProductEditGuard],
    component: ProductEditComponent
  },
  { path: 'usersettings', component: UserSettingsFormComponent },
  { path: 'customer', component: CustomerComponent },
  { path: '**', component: PageNotFoundComponent }
];

export const routing = RouterModule.forRoot(APP_ROUTES);
