import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface AdminDTO{
  di: string;
  nombre:string;
  apellido: string;
  email: string;
  telefono: string;
  password: string;

}

@Injectable({
  providedIn: 'root'
})


export class RegistrarAdminService {
  private apiUrl = 'acavalURLdeelback'

  constructor(private http:HttpClient) { }

  registrarAdmin(admin:AdminDTO): Observable<any>{
    return this.http.post(this.apiUrl, admin);
  }
}
