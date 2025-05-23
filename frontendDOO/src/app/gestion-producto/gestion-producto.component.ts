import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserComponent } from '../user/user.component';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

export class Producto {
  nombre: string;
  precio: number;
  disponibilidad: number;

  constructor(nombre: string, precio: number, disponibilidad: number) {
    this.nombre = nombre;
    this.precio = precio;
    this.disponibilidad = disponibilidad;
  }
}

@Component({
  selector: 'app-gestion-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gestion-producto.component.html',
  styleUrls: ['./gestion-producto.component.css']
})
export class GestionProductoComponent implements OnInit {
  @ViewChild(UserComponent) userComponent!: UserComponent;

  terminoBusqueda: string = '';
  nombreUsuario: string = 'Jean';
  estaIniciado: boolean = true;
  esMenuVisible: boolean = false;
  productos: Producto[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    if (this.userComponent) {
      this.nombreUsuario = this.userComponent.username;
      this.estaIniciado = this.userComponent.isLoggedIn;
    }

    if (!this.estaIniciado) {
      this.router.navigate(['/InicioSesion']); // Redirige a la página de inicio de sesión
    }
  }

  alternarMenu(): void {
    this.esMenuVisible = !this.esMenuVisible;
  }

  gestionarReservas(): void {
    // Implementar lógica para gestionar reservas
  }

  buscarProductos(event: Event): void {
    event.preventDefault();
    this.productos = [
      new Producto('Menu del dia', 15000, 10),
      new Producto('Gaseosa', 3500, 23),
      new Producto('Chicles', 400, 100),
      new Producto('Cafe', 2000, 50),
      new Producto('Té', 1800, 40),
      new Producto('Jugo de Naranja', 2500, 30),
      new Producto('Sandwich', 5000, 20),
      new Producto('Hamburguesa', 12000, 15),
      new Producto('Pizza', 15000, 10),
      new Producto('Ensalada', 8000, 25),
      new Producto('Agua', 1000, 50),
      new Producto('Galletas', 3000, 60),
      new Producto('Helado', 4000, 35)
    ];
  }
}
