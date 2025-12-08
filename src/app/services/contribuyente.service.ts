import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { UtilService } from "./util.services";

@Injectable({
  providedIn: 'root'
})
export class ContribuyenteService {
  private baseUrl = environment.API_AUTH + '/contribuyente';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Content-Length': 52098
    })
  };

  lDataUsuario:any = [
    {login:'JTAPIA', clave:'123456', sexo: 2, nombre: 'JAVIER TAPIA', dni:'45454545', digito:1, fecha:'26/11/1996',codigo: '69696969'},
    {login:'VCASTILLO', clave:'123456', sexo: 2, nombre: 'VICTOR DEL CASTILLO', dni:'46464646', digito:1, fecha:'20/20/2020',codigo: '02020202'},
    {login:'EGONZALES', clave:'123456', sexo: 2, nombre: 'EDUARDO GONZALES', dni:'43434343', digito:1, fecha:'20/20/2020',codigo: '18181818'},
    {login:'JCARRASCO', clave:'123456', sexo: 1, nombre: 'JESSICA CARRASCO', dni:'40404040', digito:1, fecha:'20/20/2020',codigo: '20202020'},
    {login:'DEMO', clave:'123456', sexo: 0, nombre: 'DEMO CORP', dni:'', digito:0, fecha:'',codigo: '123456'},
  ];

  constructor(
    private http: HttpClient,
    private router:Router,
    private dialog: MatDialog,
    private util: UtilService,
  ){ }

  datosGenerales(){
    return this.http.get<any>(this.baseUrl + "/datos-generales");
  }

}
