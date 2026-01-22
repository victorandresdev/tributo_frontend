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

  private sessionUrl = environment.API_AUTH + '/pago-online/session';

  getSession(importe: number): Observable<any> {
    const sessionRequest = new SessionRequest();
    sessionRequest.importe = importe;
    return this.http.post(this.sessionUrl, sessionRequest);
  }
}
