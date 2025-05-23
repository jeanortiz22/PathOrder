import { CommonModule } from '@angular/common';
import { Comment } from '@angular/compiler';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-panel-control',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './panel-control.component.html',
  styleUrls: ['./panel-control.component.css'],
})
export class PanelControlComponent {
  nombreUsuario: string = 'Daniel Ivan Naranjo';
  // Control para mostrar/ocultar el menú de usuario
  showUserMenu = false;

  // Datos quemados de ejemplo para la sección de pedidos

  toggleUserMenu() {
    this.showUserMenu = !this.showUserMenu;
  }

  logout() {
    // Aquí iría la lógica real de logout
    console.log('Cerrando sesión');
  }
}
