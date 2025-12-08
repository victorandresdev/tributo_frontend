import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { APP_CONSTANTS } from "../shared/constants/app.constants";
import { UtilService } from "./util.services";
import { interval, Subscription } from "rxjs";
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { APP_ROUTES } from "../shared/constants/app.routes";
import { MatDialog } from "@angular/material/dialog";
import Swal from 'sweetalert2';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SeguridadService{
  refresh!: Subscription;
  private urlService = environment.API_AUTH;
  constructor(
    private http: HttpClient,
    private util: UtilService,
    private jwtService: JwtHelperService,
    private dialog: MatDialog
  ){
      const periodo = interval(180000);
      this.refresh = periodo.subscribe(val => {
          if(this.getToken()){
              this.refreshToken();
          }
      });
      //this.urlService = environment?.API_AUTH;
  }

  getToken(){
    return this.util.getLocalStorage(APP_CONSTANTS.VAR_TOKEN);
  }

  refreshToken(){
    if(!this.getToken()){
        return;
    }
    this.http.post<any>(this.urlService + '/token',null).subscribe((data:any)=>{},
      (error) => {this.logout('Terminado por seguridad')})
  }

  logout(data: string | null = null):void{
    if(data != null){
      Swal.fire({
        title: 'Sesión terminada',
        text: data,
        icon: 'info', // Iconos disponibles: 'success', 'error', 'warning', 'info', 'question'
        confirmButtonText: 'Entendido'
      });
    }
    this.terminaLocalStorage();
    this.dialog.closeAll();
    this.util.link(APP_ROUTES.URL_HOME);
  }

  terminaLocalStorage(){
    this.util.removeLocalStorage(APP_CONSTANTS.VAR_TOKEN);
    this.util.removeLocalStorage(APP_CONSTANTS.VAR_USUARIO);
  }

  isAuthenticated(): boolean {
    const token = this.util.getLocalStorage(APP_CONSTANTS.VAR_TOKEN);
    return !this.jwtService.isTokenExpired(token);
  }
}
