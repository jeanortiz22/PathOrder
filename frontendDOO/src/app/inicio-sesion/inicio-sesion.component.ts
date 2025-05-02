import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio-sesion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio-sesion.component.html',
  styleUrl: './inicio-sesion.component.css'
})
export class InicioSesionComponent {
  
  @Output() InicioSesionSuccess = new EventEmitter<void>();

  constructor(private router: Router) {}

  onInicioSesion(correo: string, password: string) {
    if (correo === 'admin@admin.co' && password === 'admin') {
      console.log('Inicio de sesión exitoso');
      alert('Inicio de sesión exitoso');
      this.InicioSesionSuccess.emit();
      this.router.navigate(['/panel-control']); 
    } else {
      console.error('Credenciales inválidas');
      alert('Correo o contraseña incorrectos');
    }
  }
}
