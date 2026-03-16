import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { PagoRequest } from "../shared/helpers/pago-request";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private baseUrl = environment.API_AUTH + '/pagos';
  private ticketUrl = environment.API_AUTH + '/pago-online/niubiz/ticket';

  constructor(
    private http: HttpClient,
  ){ }

  getHistoriaPagos(){
    return this.http.get<any>(this.baseUrl + "/historico");
  }

  setPago(data:PagoRequest){
    return this.http.post<any>(this.baseUrl + "/registro",data);
  }

  generarTicket(operacion: string): Observable<Blob> {
    const url = `${this.ticketUrl}/${encodeURIComponent(operacion)}`;
    return this.http.get(url, { responseType: 'blob' });
  }
}
