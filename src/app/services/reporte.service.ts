import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReporteOperacionResponse } from '../shared/helpers/reporte-operacion-response';
import { ReporteOperacionFilterRequest } from '../shared/helpers/reporte-operacion-filter-request';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  private baseUrl = environment.API_AUTH + '/reporte';

  constructor(private http: HttpClient) {}

  listarReporteOperaciones(
    filtro: ReporteOperacionFilterRequest
  ): Observable<ReporteOperacionResponse[]> {
    return this.http.post<ReporteOperacionResponse[]>(
      this.baseUrl + '/operaciones',
      filtro
    );
  }
}
