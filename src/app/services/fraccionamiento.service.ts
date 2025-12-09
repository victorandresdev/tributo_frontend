import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { FraccionamientoRequest } from "../shared/helpers/fraccionamiento-request";

@Injectable({
  providedIn: 'root'
})
export class FraccionamientoService {

private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Content-Length': 52098
    })
  };

  private baseUrl = environment.API_AUTH + '/fraccionamiento';

  constructor(
    private http: HttpClient,
  ){ }

  getImpuestosPendientes(data:FraccionamientoRequest){
    return this.http.post<any>(this.baseUrl + "/deuda",data);
  }
}
