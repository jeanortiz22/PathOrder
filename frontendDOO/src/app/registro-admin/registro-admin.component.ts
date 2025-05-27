import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegistrarAdminService, AdminDTO } from '../services/registrar-admin.service';

@Component({
  selector: 'app-registro-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent {
  adminForm: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registroAdminService: RegistrarAdminService
  ) {
    // Sin validaciones: todos los campos son opcionales en el front
    this.adminForm = this.fb.group({
      di: [''],
      nombre: [''],
      apellido: [''],
      usuario: [''],
      correo: [''],
      confirmacionCorreo: [true],
      telefono: [''],
      confirmacionTelefono: [true],
      estadoCuenta: [true],
      contrasena: ['']
    });
  }

  confirmarSalida() {
    if (this.adminForm.dirty) {
      if (window.confirm('¿Estás seguro de que quieres salir? Se perderán los datos no guardados.')) {
        this.router.navigate(['/panel-control']);
      }
    } else {
      this.router.navigate(['/panel-control']);
    }
  }

  onSubmit() {
    this.mensajeExito = null;
    this.mensajeError = null;

    const dto: AdminDTO = {
      di: this.adminForm.value.di,
      nombre: this.adminForm.value.nombre,
      apellido: this.adminForm.value.apellido,
      usuario: this.adminForm.value.usuario,
      correo: this.adminForm.value.correo,
      confirmacionCorreo: this.adminForm.value.confirmacionCorreo,
      telefono: this.adminForm.value.telefono,
      confirmacionTelefono: this.adminForm.value.confirmacionTelefono,
      estadoCuenta: this.adminForm.value.estadoCuenta,
      contrasena: this.adminForm.value.contrasena
    };

    this.registroAdminService.registrarAdmin(dto).subscribe({
      next: (res: string) => {
        this.mensajeExito = res;
        this.router.navigate(['/panel-control']);
      },
      error: err => {
        this.mensajeError = err.error?.mensaje || 'Error inesperado al registrar administrador.';
      }
    });
  }
}
