import { Routes } from '@angular/router';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';
import { PanelControlComponent } from './panel-control/panel-control.component';
import {GestionProductoComponent} from './gestion-producto/gestion-producto.component';
import { CategoriasComponent } from './categorias/categorias.component';

export const routes: Routes = [
    { path: '', redirectTo: 'InicioSesion', pathMatch: 'full' },
    { path: 'InicioSesion', component: InicioSesionComponent },
    { path: 'panel-control', component: PanelControlComponent },
    { path: 'registro-admin', component: RegistroAdminComponent },
    { path: 'gestion-producto', component: GestionProductoComponent },
    { path: 'categorias', component: CategoriasComponent }

];

export class AppRoutingModule { }

