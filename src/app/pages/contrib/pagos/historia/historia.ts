import { PagoService } from './../../../../services/pago.service';
import { Component, OnInit } from '@angular/core';
import { MigajaPan } from '../../../../shared/components/migaja-pan/migaja-pan';
import { TitlePage } from '../../../../shared/components/title-page/title-page';
import { FormBuilder } from '@angular/forms';
import { UtilService } from '../../../../services/util.services';
import { CargaService } from '../../../../services/carga.service';
import { HistoriaLista } from "./historia-lista/historia-lista";
import { HistoriaResponse } from '../../../../shared/helpers/historia-response';
import { APP_CONSTANTS } from '../../../../shared/constants/app.constants';

@Component({
  selector: 'app-historia',
  imports: [MigajaPan, TitlePage, HistoriaLista],
  templateUrl: './historia.html',
  styleUrl: './historia.scss'
})
export class Historia implements OnInit {
  fechaInicio!:Date;
  fechaFin!:Date;
  lstDatos?:Array<HistoriaResponse> = [];

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private cargaService: CargaService,
    private pagoService: PagoService
  ){

  }

  ngOnInit(): void {
    /*
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
    */
    let info:any = this.utilService.validaSesion();
    this.consultaHistoria();
  }

  consultaHistoria(){
    this.cargaService.show();
    this.pagoService.getHistoriaPagos().subscribe({
      next: (rpta:any) => {
        this.cargaService.hide();
        let tiposTram:any = APP_CONSTANTS.TIPO_TRAMITE;
        this.lstDatos = rpta;
        this.lstDatos?.map((item:any) => {
          let fechaActiva = new Date(item.fecha);
          item.anio = this.utilService.formatoFecha(fechaActiva,"soloAnio");
          item.fechaMuestra = this.utilService.formatoFecha(fechaActiva,"fecha");
          item.tramite = tiposTram.find((iTip:any) => iTip.NID == (item.tipoTramite || 1))?.NOMBRE;
        });
      },
      error: () => {
        this.cargaService.hide();
      }
    });
  }
}
