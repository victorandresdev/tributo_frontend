import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ImpuestoPredialRequest } from "../shared/helpers/impuesto-predial-request";

@Injectable({
  providedIn: 'root'
})
export class ImpuestoPredialService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Content-Length': 52098
    })
  };

  private baseUrl = environment.API_AUTH + '/impuesto-predial';

  constructor(
    private http: HttpClient,
  ){ }

  getImpuestosPendientes(data:ImpuestoPredialRequest){
    return this.http.post<any>(this.baseUrl + "/deuda",data);
  }
}
