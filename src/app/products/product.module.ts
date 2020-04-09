import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SharedModule } from '../shared/shared.module';
import { routing } from '../app.routing';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ],
  imports: [
    SharedModule,
    routing
  ]
})
export class ProductModule { }
