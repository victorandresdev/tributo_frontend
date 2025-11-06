import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Router } from "@angular/router";
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UtilService{

  constructor(
    private route: Router,
    public dialog: MatDialog,
  ){

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

  link(url: string, param?: string) {
    if (param) {
      this.route.navigate([url, param]);
    } else {
      this.route.navigate([url]);
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
  }
}
