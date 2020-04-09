import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// router
import { routing } from './app.routing';

// components
import { AppComponent } from './app.component';
import { OtherComponent } from './other/other.component';
import { AnotherComponent } from './other/another.component';
import { DatabindingComponent } from './databinding/databinding.component';
import { PropertyBindingComponent } from './databinding/property-binding/property-binding.component';
import { EventBindingComponent } from './databinding/event-binding/event-binding.component';
import { TwoWayBindingComponent } from './databinding/two-way-binding/two-way-binding.component';
import { LifecycleComponent } from './lifecycle.component';
import { HeaderComponent } from './header.component';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeListComponent } from './recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe/recipe-list/recipe-item.component';
import { ShoppingListAddComponent } from './shopping-list/shopping-list-add.component';
import { RecipeStartComponent } from './recipe/recipe-start.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { StarComponent } from './shared/star/star.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

// directivies
import { HighlightDirective } from './highlight.directive';
import { UnlessDirective } from './unless.directive';
import { DropdownDirective } from './dropdown.directive';

// pipe
import { ConvertToSpacesPipe } from './shared/convert-to-spaces.pipe';
@NgModule({
  declarations: [
    AppComponent,
    OtherComponent,
    AnotherComponent,
    DatabindingComponent,
    PropertyBindingComponent,
    EventBindingComponent,
    TwoWayBindingComponent,
    LifecycleComponent,
    HeaderComponent,
    RecipeComponent,
    ShoppingListComponent,
    RecipeListComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    ShoppingListAddComponent,
    RecipeStartComponent,
    RecipeEditComponent,
    ProductListComponent,
    HighlightDirective,
    UnlessDirective,
    DropdownDirective,
    ConvertToSpacesPipe,
    StarComponent,
    ProductDetailComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
