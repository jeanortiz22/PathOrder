import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService, CategoriaDTO } from '../services/categorias.service';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    CommonModule,          // NgIf, NgFor, ngClass…
    ReactiveFormsModule    // formGroup, formControlName…
  ],
  providers: [CategoriaService],
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
  categorias: CategoriaDTO[] = [];
  form: FormGroup;
  editandoId: string | null = null;
  mensaje = '';

  constructor(
    private fb: FormBuilder,
    private categoriaSvc: CategoriaService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.cargarListado();
  }

  cargarListado(): void {
    this.categoriaSvc.listar()
      .subscribe((list: CategoriaDTO[]) => this.categorias = list);
  }

  iniciarEdicion(cat: CategoriaDTO): void {
    this.editandoId = cat.id ?? null;
    this.form.setValue({ nombre: cat.nombre });
    this.mensaje = '';
  }

  cancelar(): void {
    this.editandoId = null;
    this.form.reset();
    this.mensaje = '';
  }

  guardar(): void {
    const dto: CategoriaDTO = { nombre: this.form.value.nombre };
    const obs = this.editandoId
      ? this.categoriaSvc.actualizar(this.editandoId, dto)
      : this.categoriaSvc.crear(dto);

    obs.subscribe((msg: string) => {
      this.mensaje = msg;
      this.cancelar();
      this.cargarListado();
    });
  }

  eliminar(id: string): void {
    if (!confirm('¿Eliminar esta categoría?')) { return; }
    this.categoriaSvc.eliminar(id)
      .subscribe((msg: string) => {
        this.mensaje = msg;
        this.cargarListado();
      });
  }
}
