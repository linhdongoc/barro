import { RouterModule, Routes } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RECIPE_ROUTES } from './recipe/recipe.routes';
import { DatabindingComponent } from './databinding/databinding.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailGuard } from './products/product-detail/product-detail.guard';
import { UserSettingsFormComponent } from './user-settings-form/user-settings-form.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { ProductEditComponent } from './products/product-edit/product-edit.component';
import { ProductEditGuard } from './products/product-edit/product-edit.guard';

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
