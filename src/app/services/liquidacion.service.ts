import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { LiquidacionRequest } from "../shared/helpers/liquidacion-request";

@Injectable({
  providedIn: 'root'
})
export class LiquidacionService {

  private baseUrl = environment.API_AUTH + '/arbitrios';

  constructor(
    private http: HttpClient,
  ){ }

  getLiquidacionPendientes(data:LiquidacionRequest){
    return this.http.post<any>(this.baseUrl + "/deuda",data);
  }
}
