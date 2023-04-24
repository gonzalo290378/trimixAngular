import { HttpClient, HttpEvent, HttpHeaders, HttpRequest,} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Persona } from '../interfaces/persona.interface';
import { TipoDocumento } from '../interfaces/tipo-documento.interface';

@Injectable({
  providedIn: 'root',
})

export class PersonaService {
  personas!: Observable<Persona>;
  url: string = 'http://localhost:8080/api';

  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient, 
    private router: Router) 
    {}

  //OK
  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(`${this.url}/personas`);
  }

  create(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(`${this.url}/form/`, persona, { headers: this.httpHeaders })
      .pipe(
        catchError((e) => {
          swal.fire('Error al crear persona', e.error.persona, 'error');
          return throwError(() => e);
        })
      );
  }

  //OK
  getPersona(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.url}/form/` + id).pipe(
      catchError((e) => {
        this.router.navigate(['/personas']);
        swal.fire('Error al obtener persona', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  //OK
  update(persona: Persona, id: number): Observable<Persona> {
    console.log(persona);
    return this.http.put<Persona>(`${this.url}/form/` + id, persona, { headers: this.httpHeaders })
      .pipe(
        catchError((e) => {
          swal.fire('Error al actualizar persona', e.error.persona, 'error');
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${this.url}/form/` + id).pipe(
      catchError((e) => {
        swal.fire('Error al eliminar persona', e.error.persona, 'error');
        return throwError(() => e);
      })
    );
  }

  getTipoDocumentos(): Observable<TipoDocumento[]>{
    return this.http.get<TipoDocumento[]>(`${this.url}` + '/tiposDocumento');
  }

  getPersonaPorId( id: number ):Observable<Persona> {
    return this.http.get<Persona>(`${ this.url }/personas/${ id }`);
  }


}
