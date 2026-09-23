import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
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
  impuestoPredialMonto = 0;

  constructor(
    private utilService:UtilService,
    private contribuyenteService: ContribuyenteService,
    private changeDetectorRef: ChangeDetectorRef,
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
      if (respuesta.some((item: any) =>
        item && Object.keys(item).some((key) => key.toUpperCase() === 'TOTAL'))
      ) {
        return respuesta;
      }

      for (const item of respuesta) {
        const registros = this.normalizarListaRegistros(item);
        if (registros.length > 0) {
          return registros;
        }
      }
    }

    if (respuesta && typeof respuesta === 'object') {
      for (const valor of Object.values(respuesta)) {
        const registros = this.normalizarListaRegistros(valor);
        if (registros.length > 0 && registros.some((item: any) =>
          item && Object.keys(item).some((key) => key.toUpperCase() === 'TOTAL'))
        ) {
          return registros;
        }
      }
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
        this.impuestoPredialMonto = registros.reduce((total: number, item: any) => {
          const claveTotal = Object.keys(item ?? {}).find((key) => key.toUpperCase() === 'TOTAL');
          const valor = Number(String(item?.[claveTotal ?? ''] ?? 0).replace(/,/g, ''));
          return total + (Number.isFinite(valor) ? valor : 0);
        }, 0);
        this.changeDetectorRef.markForCheck();
      },
      error: () => {
        this.impuestoPredialMonto = 0;
        this.changeDetectorRef.markForCheck();
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
