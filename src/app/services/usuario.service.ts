import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { SeguridadService } from "./segudidad.service";
import { MatDialog } from "@angular/material/dialog";
import { UtilService } from "./util.services";
import { APP_ROUTES } from "../shared/constants/app.routes";
import { APP_CONSTANTS } from "../shared/constants/app.constants";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = environment.API_AUTH;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Content-Length': 52098
    })
  };

  constructor(
    private http: HttpClient,
    private router:Router,
    private dialog: MatDialog,
    private util: UtilService,
  ){ }

  getLogin(data:any):Observable<any>{
    return this.http.post<any>(this.baseUrl + "/login",JSON.stringify(data) /*, this.httpOptions*/);
  }

  logout():void{
    this.util.removeLocalStorage(APP_CONSTANTS.VAR_TOKEN);
    this.util.removeLocalStorage(APP_CONSTANTS.VAR_USUARIO);
    this.dialog.closeAll();
    this.util.link(APP_ROUTES.URL_HOME);
  }
}
