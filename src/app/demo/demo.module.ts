import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DemoRoutingModule } from './demo-routing.module';
import { MaterialModule } from '../shared/material.module';

// components
import { ButtonComponent } from './button/button.component';
import { FlexboxComponent } from './flexbox/flexbox.component';


@NgModule({
  declarations: [ButtonComponent, FlexboxComponent],
  imports: [
    CommonModule,
    DemoRoutingModule,
    MaterialModule,
    FormsModule,
    FlexLayoutModule
  ]
})
export class DemoModule { }
