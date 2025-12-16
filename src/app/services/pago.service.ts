import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { PagoRequest } from "../shared/helpers/pago-request";

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private baseUrl = environment.API_AUTH + '/pagos';

  constructor(
    private http: HttpClient,
  ){ }

  getHistoriaPagos(){
    return this.http.get<any>(this.baseUrl + "/historico");
  }

  setPago(data:PagoRequest){
    return this.http.post<any>(this.baseUrl + "/registro",data);
  }
}
