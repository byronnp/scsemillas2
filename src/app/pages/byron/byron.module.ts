import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ByronComponent } from './byron.component';

export const routes = [
  { path: '', component: ByronComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
    ByronComponent    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ByronModule { }
