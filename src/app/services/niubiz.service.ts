import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionRequest} from '../shared/helpers/niubiz/sessionRequest';

@Injectable({
  providedIn: 'root'
})
export class NiubizService {
  constructor(
    private http: HttpClient,
  ) { }

  private sessionUrl = environment.API_AUTH + '/pago-online/niubiz/session';
  private ticketUrl = environment.API_AUTH + '/pago-online/niubiz/ticket';

  getSession(importe: number, lstImpuestos:Array<string>): Observable<any> {
    const sessionRequest = new SessionRequest();
    sessionRequest.importe = importe;
    sessionRequest.ctaidentif = lstImpuestos
    return this.http.post(this.sessionUrl, sessionRequest);
  }

  generarTicket(operacion: string): Observable<Blob> {
    const url = `${this.ticketUrl}/${encodeURIComponent(operacion)}`;
    return this.http.get(url, { responseType: 'blob' });
  }

}
