import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-registro-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './registro-admin.component.html',
  styleUrl: './registro-admin.component.css'
})
export class RegistroAdminComponent {
  adminForm: FormGroup;

  constructor(private fb: FormBuilder, private router:Router) {
    this.adminForm = this.fb.group({
      DI: ['', Validators.required],
      nombre: ['',[ Validators.required,Validators.minLength(2),Validators.maxLength(100)]],
      Apellido: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      Confiemail: ['', [Validators.required, Validators.email]],
      Telefono: ['', [
        Validators.required,
        Validators.pattern(/^\d+$/)  // Solo números
      ]],
    
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&\-_#])[A-Za-z\d@$!%*?&\-_#]{8,}$/)
      ]],
    });
  }

  onSubmit() {
    // Verificamos si los correos electrónicos coinciden
    if (this.adminForm.value.email !== this.adminForm.value.Confiemail) {
      // Si no coinciden, establecemos un error en el campo 'Confiemail'
      this.adminForm.get('Confiemail')?.setErrors({ emailMismatch: true });
      console.log('Los correos electrónicos no coinciden.');
      return; // Detenemos el envío del formulario
    }


    if (this.adminForm.valid) {
      console.log('Datos enviados:', this.adminForm.value);
      this.router.navigate(['/user'])
    } else {
      console.log('datos no validos')
    }
  }
}
