import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; //actia modulos para formularios
import { SharedModule } from '../../shared/shared.module';

import { UsuariosComponent } from './usuarios/usuarios.component';
import { SitiosComponent } from './sitios/sitios.component';
import { SitiosformComponent } from './sitios/sitiosform/sitiosform.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { SolicitudComponent } from './solicitudes/solicitud/solicitud.component';

export const routes = [
  { path: 'sitios', component: SitiosComponent, data: { breadcrumb: 'Sitios' } },
  { path: 'usuarios', component: UsuariosComponent, data: { breadcrumb: 'Usuarios' } }, 
  { path: 'sitios/sitiosform', component: SitiosformComponent, data: { breadcrumb: 'Sitios' } } ,
  { path: 'solicitudes', component: SolicitudesComponent, data: { breadcrumb: 'Solicitudes' } },
  { path: 'solicitudes/solicitud', component: SolicitudComponent, data: { breadcrumb: 'Solicitud' } } 
];

@NgModule({
  declarations: [    
    UsuariosComponent,
    SitiosComponent,
    SitiosformComponent,
    SolicitudesComponent,
    SolicitudComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RegistrosModule { }
