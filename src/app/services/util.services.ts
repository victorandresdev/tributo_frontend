import { LayoutService } from './layout.service';
import { inject, Inject, Injectable, LOCALE_ID } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import { APP_ROUTES } from "../shared/constants/app.routes";
import { APP_CONSTANTS } from '../shared/constants/app.constants';
import { FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilService{
  public snackBar = inject(MatSnackBar);
  constructor(
    private route: Router,
    public dialog: MatDialog,
    private layoutService: LayoutService,
    @Inject(LOCALE_ID) private locale: string
  ){

  }

  getSesionStorage(item:any):any{
    return sessionStorage.getItem(item);
  }

  setSesionStorage(id:string, value:any):void{
    sessionStorage.setItem(id,value);
  }

  removeSesionStorage(item:any){
    sessionStorage.removeItem(item);
  }

  getLocalStorage(item:any):any{
    return localStorage.getItem(item);
  }

  setLocalStorage(id:string, value:any):void{
    localStorage.setItem(id,value);
  }

  removeLocalStorage(item:any){
    localStorage.removeItem(item);
  }

  removeAllStorage(){
    localStorage.removeItem(APP_CONSTANTS.VAR_TOKEN);
    localStorage.removeItem(APP_CONSTANTS.VAR_LOCAL);
    localStorage.removeItem(APP_CONSTANTS.VAR_PAGE_ACTIVA);
    sessionStorage.removeItem(APP_CONSTANTS.VAR_USUARIO);
  }

  link(url: string, param?: string) {
    if (param) {
      this.route.navigate([url, param]);
    } else {
      this.route.navigate([url]);
    }
  }

  validaSesion(){
    if(this.getSesionStorage(APP_CONSTANTS.VAR_USUARIO) == undefined){
      this.removeAllStorage();
      this.link(APP_ROUTES.URL_LOGIN);
    }else{
      let aux:any = this.getSesionStorage(APP_CONSTANTS.VAR_USUARIO);
      return JSON.parse(aux);
    }
  }

  getAlert(title: string, message: string, type?: 'success' | 'info' | 'error', textButton?: string) {
    /*return this.dialog.open(AlertComponent, {
      width: width || '450px',
      data: {title: title, message: message, type: type, textButton: textButton, messageAlign: messageAlign},
      disableClose: true,
      autoFocus: false,
    });*/
    return Swal.fire({
      title: title,
      text: message,
      icon: type, // Iconos disponibles: 'success', 'error', 'warning', 'info', 'question'
      confirmButtonText: textButton
    });
    /*return this.snackBar.open(message, title, {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['snackbar-' + type] // opcional
    });*/
  }

  getConfirm(question:string){
    return Swal.fire({
      title: question,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Confirmado",
      denyButtonText: "No"
    });
    /*.then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
    */
  }

  cambiaMenu(id:number){
    this.layoutService.myIndicador.set(id);
    this.setLocalStorage(APP_CONSTANTS.VAR_PAGE_ACTIVA,id)
  }

  pestanaPagos(llamada:string, local:string){
    if(llamada != local){
      this.cambiaMenu(2);
      if(llamada == 'opt1'){
        this.link(APP_ROUTES.URL_PAGOS.PENDIENTES.PREDIAL);
      }else if(llamada == 'opt2'){
        this.link(APP_ROUTES.URL_PAGOS.PENDIENTES.FRACCION);
      }else if(llamada == 'opt3'){
        this.link(APP_ROUTES.URL_PAGOS.PENDIENTES.LIQUIDACION);
      }
    }
  }

  public getErrorMessage(formName: FormGroup, formControl: any, min?: number, max?: number, onlyNumber?: boolean, mail?: boolean): string {
    let message = '';
    if (formName.get(formControl)?.hasError('required')) {
      message = 'Este campo es requerido';
    }

    if (formName.get(formControl)?.hasError('minlength')) {
      message = `Mínimo ${min} caracteres`;
    }

    if (formName.get(formControl)?.hasError('maxlength')) {
      message = `Máximo ${max} caracteres`;
    }

    if (formName.get(formControl)?.hasError('min')) {
      message = `Mínimo ${min}`;
    }

    if (formName.get(formControl)?.hasError('max')) {
      message = `Máximo ${max}`;
    }

    if (formName.get(formControl)?.hasError('pattern') && onlyNumber) {
      message = 'Sólo se aceptan números';
    }

    if (formName.get(formControl)?.hasError('pattern') && !onlyNumber) {
      message = 'Se aceptan letras y números sin espacios al inicio y final';
    }

    if (formName.get(formControl)?.hasError('pattern') && mail) {
      message = 'Debe ingresar un correo electrónico válido';
    }

    return message;
  }

  formatoFecha(fecha:Date, tipoFormato?: 'fecha' | 'fechaHora' | 'hora' | 'fechaData' | 'soloAnio'){
    let formato:any;
    if(tipoFormato == 'fecha'){
      formato = APP_CONSTANTS.FORMATO_FECHA.FECHA;
    }
    if(tipoFormato == 'fechaHora'){
      formato = APP_CONSTANTS.FORMATO_FECHA.FECHA_HORA;
    }
    if(tipoFormato == 'hora'){
      formato = APP_CONSTANTS.FORMATO_FECHA.HORA;
    }
    if(tipoFormato == 'fechaData'){
      formato = APP_CONSTANTS.FORMATO_FECHA.FECHA_DATA;
    }
    if(tipoFormato == 'soloAnio'){
      formato = APP_CONSTANTS.FORMATO_FECHA.SOLO_ANIO;
    }
    return formatDate(new Date(fecha), formato, 'en-US')
  }

  getNumeroAleatorio(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
