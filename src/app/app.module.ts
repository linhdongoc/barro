import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';

// router
import { routing } from './app-routing.module';

// components
import { AppComponent } from './app.component';
import { OtherComponent } from './modules/other/other.component';
import { AnotherComponent } from './modules/other/another.component';
import { DatabindingComponent } from './modules/databinding/databinding.component';
import { PropertyBindingComponent } from './modules/databinding/property-binding/property-binding.component';
import { EventBindingComponent } from './modules/databinding/event-binding/event-binding.component';
import { TwoWayBindingComponent } from './modules/databinding/two-way-binding/two-way-binding.component';
import { LifecycleComponent } from './modules/lifecycle/lifecycle.component';
import { HeaderComponent } from './modules/header/header.component';
import { RecipeComponent } from './modules/recipe/recipe.component';
import { ShoppingListComponent } from './modules/shopping-list/shopping-list.component';
import { RecipeListComponent } from './modules/recipe/recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './modules/recipe/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './modules/recipe/recipe-list/recipe-item.component';
import { ShoppingListAddComponent } from './modules/shopping-list/shopping-list-add.component';
import { RecipeStartComponent } from './modules/recipe/recipe-start.component';
import { RecipeEditComponent } from './modules/recipe/recipe-edit/recipe-edit.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';
import { UserSettingsFormComponent } from './modules/user-settings-form/user-settings-form.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { HandsOnRxjsComponent } from './modules/hands-on-rxjs/hands-on-rxjs.component';
import { CounterComponent } from './modules/hands-on-rxjs/counter/counter.component';
import { StepSwitcherComponent } from './modules/hands-on-rxjs/step-switcher/step-switcher.component';
import { AutoCompleteComponent } from './modules/hands-on-rxjs/auto-complete/auto-complete.component';
import { MergeMapDemoComponent } from './modules/hands-on-rxjs/merge-map-demo/merge-map-demo.component';
import { MergeScanDemoComponent } from './modules/hands-on-rxjs/merge-scan-demo/merge-scan-demo.component';
import { ConcatMapDemoComponent } from './modules/hands-on-rxjs/concat-map-demo/concat-map-demo.component';
import { CitySwitcherComponent } from './modules/hands-on-rxjs/city-switcher/city-switcher.component';
import { CoefficientSwitcherComponent } from './modules/hands-on-rxjs/coefficient-switcher/coefficient-switcher.component';
import { PriceComponent } from './modules/hands-on-rxjs/price/price.component';

// directivies
import { HighlightDirective } from './directives/highlight.directive';
import { UnlessDirective } from './directives/unless.directive';
import { DropdownDirective } from './directives/dropdown.directive';

// module
import { ProductModule } from './modules/products/product.module';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { RatingModule } from 'ngx-bootstrap/rating';

// reducers
import { stepSwitcherReducer } from '@app/modules/hands-on-rxjs/step-switcher/step-switcher.reducer';
import { citySwitcherReducer } from '@app/modules/hands-on-rxjs/city-switcher/city-switcher.reducer';
import { coefficientSwitcherReducer } from '@app/modules/hands-on-rxjs/coefficient-switcher/coefficient-switcher.reducer';

const reducers = {
  stepValue: stepSwitcherReducer,
  cityPrice: citySwitcherReducer,
  coefficient: coefficientSwitcherReducer
};

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
    HighlightDirective,
    UnlessDirective,
    DropdownDirective,
    PageNotFoundComponent,
    UserSettingsFormComponent,
    CustomerComponent,
    HandsOnRxjsComponent,
    CounterComponent,
    StepSwitcherComponent,
    AutoCompleteComponent,
    MergeMapDemoComponent,
    MergeScanDemoComponent,
    ConcatMapDemoComponent,
    CitySwitcherComponent,
    CoefficientSwitcherComponent,
    PriceComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    ProductModule,
    ButtonsModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    RatingModule.forRoot(),
    StoreModule.forRoot(reducers)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
