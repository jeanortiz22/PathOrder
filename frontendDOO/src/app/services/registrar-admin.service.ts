import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface AdminDTO {
  di: string;
  nombre: string;
  apellido: string;
  usuario: string;
  correo: string;
  confirmacionCorreo: boolean;
  telefono: string;
  confirmacionTelefono: boolean;
  estadoCuenta: boolean;
  contrasena: string;
}

@Injectable({
  providedIn: 'root'
})


export class RegistrarAdminService {
  private apiUrl = 'http://localhost:8080/api/v1/administradores'

  constructor(private http:HttpClient) { }

  registrarAdmin(admin: AdminDTO): Observable<any> {
    return this.http.post(this.apiUrl, admin, { responseType: 'text' as 'json' });
  }


}


