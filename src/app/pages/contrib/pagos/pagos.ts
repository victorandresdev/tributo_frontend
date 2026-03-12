import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../services/util.services';
import { APP_ROUTES } from '../../../shared/constants/app.routes';
import { APP_CONSTANTS } from '../../../shared/constants/app.constants';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.html',
  imports: [TitleCasePipe],
  styleUrl: './pagos.scss'
})
export class Pagos {
  constructor(
    private utilService:UtilService,
  ){}
  infoUsu!:any;

  ngOnInit(): void {
    if(this.utilService.getSesionStorage(APP_CONSTANTS.VAR_USUARIO) == undefined){
      this.utilService.removeAllStorage();
      this.utilService.link(APP_ROUTES.URL_LOGIN);
    }else{
      let aux:any = this.utilService.getSesionStorage(APP_CONSTANTS.VAR_USUARIO);
      this.infoUsu = JSON.parse(aux);
    }
  }

  ir(nro:number){
    this.utilService.cambiaMenu(2)
    if(nro == 1){
      this.utilService.link(APP_ROUTES.URL_PAGOS.PENDIENTES.PREDIAL);
    }else{
      this.utilService.link(APP_ROUTES.URL_PAGOS.HISTORIA);
    }
  }
}
