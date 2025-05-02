import { Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { PanelControlComponent } from './panel-control/panel-control.component';

export const routes: Routes = [
    { path: '', redirectTo: 'InicioSesion', pathMatch: 'full' },
    { path: 'InicioSesion', component: InicioSesionComponent },
    { path: 'panel-control', component: PanelControlComponent },
    { path: 'registro-admin', component: RegistroAdminComponent },
];



export class AppRoutingModule { }
