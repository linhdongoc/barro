import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../shared/material.module';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ContactmanagerAppComponent } from './contactmanager-app/contactmanager-app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


const routes: Routes = [
  { path: '', component: ContactmanagerAppComponent,
    children: [
      { path: '', component: MainContentComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    ContactmanagerAppComponent,
    ToolbarComponent,
    MainContentComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexModule,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ContactmanagerModule { }
