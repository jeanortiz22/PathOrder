import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoriaDTO {
  id?: string;
  nombre: string;
}

@Injectable({ providedIn: 'root' })
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/api/v1/categorias';

  constructor(private http: HttpClient) { }

  listar(): Observable<CategoriaDTO[]> {
    return this.http.get<CategoriaDTO[]>(this.apiUrl);
  }

  obtenerPorId(id: string): Observable<CategoriaDTO> {
    return this.http.get<CategoriaDTO>(`${this.apiUrl}/${id}`);
  }

  crear(categoria: CategoriaDTO): Observable<string> {
    return this.http.post<string>(this.apiUrl, categoria);
  }

  actualizar(id: string, categoria: CategoriaDTO): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, categoria);
  }

  eliminar(id: string): Observable<string> {
    return this.http.delete<string>(`${this.apiUrl}/${id}`);
  }
}
