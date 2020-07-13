import { NgModule } from '@angular/core';
import { routing } from '../../app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    InMemoryWebApiModule.forRoot(ProductData),
    routing
  ]
})
export class ProductModule { }
