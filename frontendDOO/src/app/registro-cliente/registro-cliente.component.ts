import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
// import { RegistrarClienteService, ClienteDTO } from '../services/registrar-cliente.service';

@Component({
  selector: 'app-registro-cliente',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-cliente.component.html',
  styleUrls: ['./registro-cliente.component.css']
})
export class RegistroClienteComponent {
  clienteForm: FormGroup;
  mensajeExito: string | null = null;
  mensajeError: string | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    //private registrarClienteService: RegistrarClienteService
  ) {
    this.clienteForm = this.fb.group({
      di: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      confirmacionCorreo: [false],
      confirmacionTelefono: [false],
      estadoCuenta: [false],
      contrasena: ['', [Validators.required]],
      confirmarContrasena: ['', Validators.required]
    }, { validators: this.contrasenasIgualesValidator });
  }

  contrasenasIgualesValidator(form: FormGroup) {
    const pass = form.get('contrasena')?.value;
    const confirm = form.get('confirmarContrasena')?.value;
    return pass === confirm ? null : { contrasenasNoCoinciden: true };
  }

  confirmarSalida() {
    if (this.clienteForm.dirty) {
      if (window.confirm('¿Estás seguro de que quieres salir? Se perderán los datos no guardados.')) {
        this.router.navigate(['/panel-control']);
      }
    } else {
      this.router.navigate(['/panel-control']);
    }
  }

  soloNumeros(event: Event, campo: 'di' | 'telefono'): void {
    const input = event.target as HTMLInputElement;
    const soloNumeros = input.value.replace(/[^0-9]/g, '');
    input.value = soloNumeros;
    this.clienteForm.get(campo)?.setValue(soloNumeros, { emitEvent: false });
  }

  soloLetras(event: Event, campo: 'nombre' | 'apellido'): void {
    const input = event.target as HTMLInputElement;
    const soloLetras = input.value.replace(/[^A-Za-zÁÉÍÓÚáéíóúÑñ\s]/g, '');
    input.value = soloLetras;
    this.clienteForm.get(campo)?.setValue(soloLetras, { emitEvent: false });
  }

  onSubmit() {
    this.mensajeExito = null;
    this.mensajeError = null;

    /* const dto: ClienteDTO = {
      di: this.clienteForm.value.di,
      nombre: this.clienteForm.value.nombre,
      apellido: this.clienteForm.value.apellido,
      correo: this.clienteForm.value.correo,
      telefono: this.clienteForm.value.telefono,
      confirmacionCorreo: false,
      confirmacionTelefono: false,
      estadoCuenta: false,
      contrasena: this.clienteForm.value.contrasena
    };

    this.registrarClienteService.registrarCliente(dto).subscribe({
      next: (res: any) => {
        if (typeof res === 'string') {
          this.mensajeExito = res;
        } else if (res?.mensaje) {
          this.mensajeExito = res.mensaje;
        } else {
          this.mensajeExito = 'Cliente registrado con éxito.';
        }
        this.mensajeError = null;
        this.clienteForm.reset({ estadoCuenta: false });

        setTimeout(() => {
          this.mensajeExito = null;
          this.router.navigate(['/panel-control']);
        }, 3000);
      },
      error: err => {
        console.error('Error recibido del backend:', err);

        if (err?.error?.mensaje) {
          this.mensajeError = err.error.mensaje;
        } else if (typeof err?.error === 'string') {
          try {
            const parsed = JSON.parse(err.error);
            this.mensajeError = parsed.mensaje || 'Ocurrió un error.';
          } catch (e) {
            this.mensajeError = err.error;
          }
        } else {
          this.mensajeError = 'Error inesperado al registrar cliente, contacte con el servidor por favor.';
        }

        this.mensajeExito = null;
      }
    }); */
  } 
}
