import { Component } from '@angular/core';
import { MigajaPan } from '../../../shared/components/migaja-pan/migaja-pan';
import { TitlePage } from '../../../shared/components/title-page/title-page';
import { UtilService } from '../../../services/util.services';
import { APP_ROUTES } from '../../../shared/constants/app.routes';

@Component({
  selector: 'app-pagos',
  imports: [MigajaPan,TitlePage],
  templateUrl: './pagos.html',
  styleUrl: './pagos.scss'
})
export class Pagos {
  constructor(
    private utilService:UtilService,
  ){

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
