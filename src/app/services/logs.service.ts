import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LogAuditoriaResponse } from '../shared/helpers/log-auditoria-response';
import { LogAuditoriaFilterRequest } from '../shared/helpers/log-auditoria-filter-request';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private baseUrl = environment.API_AUTH + '/logs';

  constructor(private http: HttpClient) {}

  listarLogsAuditoria(
    filtro: LogAuditoriaFilterRequest
  ): Observable<LogAuditoriaResponse[]> {
    return this.http.post<LogAuditoriaResponse[]>(
      this.baseUrl + '/logsAuditoria',
      filtro
    );
  }
}
