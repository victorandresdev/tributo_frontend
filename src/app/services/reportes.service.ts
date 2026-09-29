import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ReportePagoOnlineUserResponse } from '../shared/helpers/reporte-pago-online-user-response';
import { ReportePagoOnlineUserFilterRequest } from '../shared/helpers/reporte-pago-online-user-filter-request';

@Injectable({
  providedIn: 'root',
})
export class ReportesService {
  private baseUrl = environment.API_AUTH + '/reportes';

  constructor(private http: HttpClient) {}

  listarPagosOnlineUsers(
    filtro: ReportePagoOnlineUserFilterRequest
  ): Observable<ReportePagoOnlineUserResponse[]> {
    return this.http.post<ReportePagoOnlineUserResponse[]>(
      this.baseUrl + '/pagosOnlineUsers',
      filtro
    );
  }

  exportarPagosOnlineUsersExcel(
    filtro: ReportePagoOnlineUserFilterRequest
  ): Observable<HttpResponse<ArrayBuffer>> {
    return this.http.post(this.baseUrl + '/pagosOnlineUsers/excel', filtro, {
      responseType: 'arraybuffer',
      observe: 'response',
    });
  }
}

