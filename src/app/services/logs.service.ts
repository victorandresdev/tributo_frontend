import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LogAuditoriaResponse } from '../shared/helpers/log-auditoria-response';

@Injectable({
  providedIn: 'root',
})
export class LogsService {
  private baseUrl = environment.API_AUTH + '/logs';

  constructor(private http: HttpClient) {}

  listarLogsAuditoria(): Observable<LogAuditoriaResponse[]> {
    return this.http.post<LogAuditoriaResponse[]>(this.baseUrl + '/logsAuditoria', {});
  }
}
