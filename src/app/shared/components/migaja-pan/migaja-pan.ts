import { APP_CONSTANTS } from '../../constants/app.constants';
import { UtilService } from './../../../services/util.services';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-migaja-pan',
  imports: [],
  templateUrl: './migaja-pan.html',
  styleUrl: './migaja-pan.scss'
})
export class MigajaPan implements OnChanges{
  @Input() verMigaja!: number;
  private lstMenu:any[] = [
    { ID: 1, MIGAJA: APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.INICIO,
      PREVIOS: [], IDMENU: 1 },
    { ID: 2, MIGAJA: APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.PAGOS,
      PREVIOS: [
        APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.INICIO
      ], IDMENU: 2
    },
    { ID: 3, MIGAJA: APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.PAGOS.PENDIENTES,
      PREVIOS: [
        APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.INICIO,
        APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.PAGOS
      ], IDMENU: 2
    },
    { ID: 4, MIGAJA: APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.PAGOS.HISTORIA,
      PREVIOS: [
        APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.INICIO,
        APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.PAGOS
      ], IDMENU: 2
    },
    { ID: 5, MIGAJA: APP_CONSTANTS.VAR_MENU.ADMIN.SEDES,
      PREVIOS: [
        APP_CONSTANTS.VAR_MENU.CONTRIBUYENTE.INICIO,
      ], IDMENU: 3
    },
  ];

  public migas:any[] = [];
  public ultimo:any;
  public activa!: number;
  private nId:number = 0;
  constructor(
    private utilService:UtilService,
  ){

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['verMigaja']){
      this.nId = this.verMigaja;
      let lista:any = this.lstMenu.find((item:any) => item.ID == this.nId);
      if(lista != undefined){
        this.migas = lista.PREVIOS;
        this.ultimo = lista.MIGAJA;
        this.activa = lista.IDMENU;
      }
    }
  }

  ir(ruta: string, activa:number){
    this.utilService.cambiaMenu(activa);
    this.utilService.link(ruta);

  }
}
