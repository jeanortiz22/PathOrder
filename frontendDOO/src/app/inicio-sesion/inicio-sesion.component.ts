import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  imports : [CommonModule],
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent {
  mensajeError: string | null = null;

  constructor(private router: Router) {}

  onInicioSesion(correo: string, contrasena: string): void {
    this.mensajeError = null;

    if (!correo || !contrasena) {
      this.mensajeError = 'El correo y la contraseña son obligatorios.';
      return;
    }

    // Dato quemado (temporal hasta tener backend)
    if (correo === 'admin@admin.co' && contrasena === 'Admin') {
      this.router.navigate(['/panel-control']);
    } else {
      this.mensajeError = 'Correo o contraseña inválidos.';
    }
  }
}
