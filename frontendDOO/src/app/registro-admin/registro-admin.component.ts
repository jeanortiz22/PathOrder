import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
      di: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', Validators.required],
      usuario: ['', Validators.required],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      confirmacionCorreo: [false],
      confirmacionTelefono: [false],
      estadoCuenta: [false],
      contrasena: ['', [
        Validators.required]],
      confirmarContrasena: ['', Validators.required]
    }, { validators: this.contrasenasIgualesValidator });
  }

  // Validador a nivel de FormGroup
  contrasenasIgualesValidator(form: FormGroup) {
    const pass = form.get('contrasena')?.value;
    const confirm = form.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { contrasenasNoCoinciden: true };
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

  //solo se deja ingresar numeros
soloNumeros(event: Event, campo: 'di' | 'telefono'): void {
  const input = event.target as HTMLInputElement;
  const soloNumeros = input.value.replace(/[^0-9]/g, '');
  input.value = soloNumeros;
  this.adminForm.get(campo)?.setValue(soloNumeros, { emitEvent: false });
}

//solo deja ingresar letras y espacios 
soloLetras(event: Event, campo: 'nombre' | 'apellido' | 'usuario'): void {
  const input = event.target as HTMLInputElement;
  const soloLetras = input.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
  input.value = soloLetras;
  this.adminForm.get(campo)?.setValue(soloLetras, { emitEvent: false });
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
    confirmacionCorreo: false,
    telefono: this.adminForm.value.telefono,
    confirmacionTelefono: false,
    estadoCuenta: false,
    contrasena: this.adminForm.value.contrasena
  };

  this.registroAdminService.registrarAdmin(dto).subscribe({
  next: (res: any) => {
    if (typeof res === 'string') {
      this.mensajeExito = res;
    } else if (res?.mensaje) {
      this.mensajeExito = res.mensaje;
    } else {
      this.mensajeExito = 'Administrador registrado con éxito.';
    }
    this.mensajeError = null;

    this.adminForm.reset({ estadoCuenta: false });

    setTimeout(() => {
      this.mensajeExito = null;
      this.router.navigate(['/panel-control']); // <--- redirección aquí
    }, 3000);
  },
error: err => {
  console.error('Error recibido del backend:', err);

  // Caso 1: viene ya como objeto JSON
  if (err?.error?.mensaje) {
    this.mensajeError = err.error.mensaje;
  }

  // Caso 2: viene como string JSON plano -> hay que parsearlo
  else if (typeof err?.error === 'string') {
    try {
      const parsed = JSON.parse(err.error);
      this.mensajeError = parsed.mensaje || 'Ocurrió un error.';
    } catch (e) {
      this.mensajeError = err.error; // texto plano no JSON
    }
  }

  // Caso 3: fallback
  else {
    this.mensajeError = 'Error inesperado al registrar administrador contacte con el servidor por favor .';
  }

  this.mensajeExito = null;
}

});

}
}