import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AreasComponent } from './areas/areas.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

export const routes = [
  { path: '', redirectTo: 'areas', pathMatch: 'full'},
  { path: 'areas', component: AreasComponent, data: { breadcrumb: 'Areas' } }
 
];

@NgModule({
  declarations: [
    AreasComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class RegistrosModule { }
