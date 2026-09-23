import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../../services/util.services';
import { APP_ROUTES } from '../../../shared/constants/app.routes';
import { APP_CONSTANTS } from '../../../shared/constants/app.constants';
import { TitleCasePipe } from '@angular/common';
import { ContribuyenteService } from '../../../services/contribuyente.service';
import { ImpuestoPredialRequest } from '../../../shared/helpers/impuesto-predial-request';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.html',
  imports: [TitleCasePipe],
  styleUrl: './pagos.scss'
})
export class Pagos {
  infoUsu!:any;
  impuestoPredialMonto = 151.41;

  constructor(
    private utilService:UtilService,
    private contribuyenteService: ContribuyenteService,
  ){}

  ngOnInit(): void {
    if(this.utilService.getSesionStorage(APP_CONSTANTS.VAR_USUARIO) == undefined){
      this.utilService.removeAllStorage();
      this.utilService.link(APP_ROUTES.URL_LOGIN);
      return;
    }

    let aux:any = this.utilService.getSesionStorage(APP_CONSTANTS.VAR_USUARIO);
    this.infoUsu = JSON.parse(aux);
    this.cargarResumenImpuestoPredial();
  }

  private normalizarListaRegistros(respuesta: any): any[] {
    if (Array.isArray(respuesta)) {
      return respuesta;
    }

    if (Array.isArray(respuesta?.data)) {
      return respuesta.data;
    }

    if (Array.isArray(respuesta?.result)) {
      return respuesta.result;
    }

    if (Array.isArray(respuesta?.items)) {
      return respuesta.items;
    }

    if (respuesta && typeof respuesta === 'object') {
      const valores = Object.values(respuesta);
      const primerArreglo = valores.find((valor) => Array.isArray(valor));
      return Array.isArray(primerArreglo) ? primerArreglo : [];
    }

    return [];
  }

  private cargarResumenImpuestoPredial(): void {
    const consulta = new ImpuestoPredialRequest();
    const fecha = new Date();
    consulta.anioInicio = fecha.getFullYear().toString();
    consulta.anioFin = fecha.getFullYear().toString();
    consulta.inicio = fecha.getFullYear();
    consulta.fin = fecha.getFullYear();
    consulta.estado = APP_CONSTANTS.TIPO_IMPUESTO.IMPUESTOS;

    this.contribuyenteService.getImpuestosPendientes(consulta).subscribe({
      next: (respuesta: any) => {
        const registros = this.normalizarListaRegistros(respuesta);
        if (registros.length > 0) {
          this.impuestoPredialMonto = registros.reduce((total: number, item: any) => {
            const valor = Number(item?.TOTAL ?? item?.total ?? 0);
            return total + (Number.isFinite(valor) ? valor : 0);
          }, 0);
        }
      },
      error: () => {
        this.impuestoPredialMonto = 151.41;
      }
    });
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
