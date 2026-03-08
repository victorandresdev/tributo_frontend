import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { SeguridadService } from "./segudidad.service";
import { MatDialog } from "@angular/material/dialog";
import { UtilService } from "./util.services";
import { APP_ROUTES } from "../shared/constants/app.routes";
import { APP_CONSTANTS } from "../shared/constants/app.constants";
import { PersonaRequest } from "../shared/helpers/login/persona-request";
import { AdminRequest } from "../shared/helpers/login/admin-request";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = environment.API_AUTH + '/auth';

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

  getLogin(data:any):Observable<any>{
    this.util.removeAllStorage();
    return this.http.post<any>(this.baseUrl + "/login-persona",data);
  }

  getLoginAdmin(data:AdminRequest):Observable<any>{
    this.util.removeAllStorage();
    return this.http.post<any>(this.baseUrl + "/login-admin",data);
  }

  getLoginContribuyente(data:PersonaRequest){
    let info:any;
    this.util.removeAllStorage();
    info = this.http.post<any>(this.baseUrl + "/loginGeneral",data,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
    );
    return info;
  }

  getDatosContribuyente(tipo: number, dni:string, digito:number, fecha:string, codigo:string){
    console.log("entro servicio")
    if(tipo == 1){
      return this.lDataUsuario.find((item:any) => item.dni == dni && item.digito == digito && item.fecha == fecha);
    }else{
      return this.lDataUsuario.find((item:any) => item.codigo == codigo);
    }
  }

  getDatosUsuario(login:string){
    return this.lDataUsuario.find((item:any) => item.login == login);
  }

  logout():void{
    this.util.removeAllStorage();
    this.dialog.closeAll();
    this.util.link(APP_ROUTES.URL_HOME);
  }
}
