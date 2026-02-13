import { FraccionamientoService } from './../../../../services/fraccionamiento.service';
import { Component, OnInit } from '@angular/core';
import { MigajaPan } from '../../../../shared/components/migaja-pan/migaja-pan';
import { TitlePage } from '../../../../shared/components/title-page/title-page';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UtilService } from '../../../../services/util.services';
import { APP_ROUTES } from '../../../../shared/constants/app.routes';
import { ListInLine } from "../../../../shared/components/list-in-line/list-in-line";
import { Options } from '../../../../shared/helpers/options';
import { FraccionLista } from "./fraccion-lista/fraccion-lista";
import { TotalPagar } from "../../../../shared/components/total-pagar/total-pagar";
import { CargaService } from '../../../../services/carga.service';
import { FraccionamientoRequest } from '../../../../shared/helpers/fraccionamiento-request';
import { FraccionamientoResponse } from '../../../../shared/helpers/fraccionamiento-response';
import { ContribuyenteService } from '../../../../services/contribuyente.service';
import { ImpuestoPredialRequest } from '../../../../shared/helpers/impuesto-predial-request';
import { APP_CONSTANTS } from '../../../../shared/constants/app.constants';
import { DtImpuesto } from '../../../../shared/helpers/dtImpuestos';
import { ListaResumenRegistro } from '../../../../shared/helpers/lista-resumen-registro';

@Component({
  selector: 'app-fraccion',
  imports: [MigajaPan, TitlePage, MatButtonToggleModule,
    CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, ListInLine, FraccionLista, TotalPagar],
  templateUrl: './fraccion.html',
  styleUrl: './fraccion.scss'
})
export class Fraccion implements OnInit{
  public form!: FormGroup;
  public monto!: number;
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private cargaService: CargaService,
    private fraccionamientoService: FraccionamientoService,
    private contribuyenteService: ContribuyenteService
  ){

  }
  lstAnios:Array<Options> = [];
  idContriB!:number;
  dtConsulta!:ImpuestoPredialRequest;
  lstDatos?:Array<FraccionamientoResponse> = [];
  lstMarcados?:any[] = [];

  ngOnInit(): void {
    let info:any = this.utilService.validaSesion();
    this.form = this.fb.group({
      impuesto:["opt2"]
    });
    this.form.get('impuesto')?.valueChanges.subscribe(val => {
      this.utilService.pestanaPagos(val,"opt2");
    });
    this.dtConsulta = new ImpuestoPredialRequest();
    this.idContriB = info.usuario.idContribuyente;
    this.lstAnios = this.utilService.getListaAnios();
    let fecha:Date = new Date()
    this.dtConsulta.anioInicio = fecha.getFullYear().toString();
    this.dtConsulta.anioFin = fecha.getFullYear().toString();
    this.dtConsulta.inicio = fecha.getFullYear();
    this.dtConsulta.fin = fecha.getFullYear();
    this.dtConsulta.estado = APP_CONSTANTS.TIPO_IMPUESTO.FRACCION;
    this.monto = 0;
    this.consultaImpuestos();
  }

  seleccionaAnio(event:any, indicador:number){
    console.log(event);
    if(indicador == 1){
      this.dtConsulta.anioInicio = event;
      this.dtConsulta.inicio = event;
    }else{
      this.dtConsulta.anioFin = event;
      this.dtConsulta.fin = event;
    }
    this.consultaImpuestos();
  }

  consultaImpuestos(){
    this.cargaService.show();
    this.contribuyenteService.getImpuestosPendientes(this.dtConsulta).subscribe({
      next: (rpta:Array<DtImpuesto>) => {
        this.cargaService.hide();
        this.lstDatos = rpta;

        this.lstDatos?.map((item:any) => {
          item.SALDO = item.AFECTO - item.PAGADO;
          item.ENVIO = this.utilService.formatoFecha(new Date(item.FECHVENC),"fecha");
          let datosItem:ListaResumenRegistro = new ListaResumenRegistro();
          datosItem.visibles?.push({concepto:"CODIGO",valor:item.ANYOIMP + '.' + item.TRIBUTCODI, tipo:'1', sentido:'1'});
          datosItem.visibles?.push({concepto:"PERIODO",valor:item.PERIODO, tipo:'1',sentido:'1'});
          datosItem.visibles?.push({concepto:"TRIBUTO",valor:item.TRIBUTDESC, tipo:'1',sentido:'2'});
          datosItem.visibles?.push({concepto:"TOTAL",valor:item.TOTAL, tipo:'2',sentido:'2'});
          item.DATOSITEM = datosItem;
        });

      },
      error: () => {
        this.cargaService.hide();
      }
    })
  }

  muestraMarcados(dtFilas:any){
    this.monto = 0;
    this.lstMarcados = [];
    if(dtFilas.length > 0){
      dtFilas.forEach((item:FraccionamientoResponse) => {
        this.monto += item.TOTALES || 0;
        this.lstMarcados?.push(
          {
            sConcepto: item.CONVENIO,
            nPagara: item.TOTALES
          }
        )
      });
    }
  }

  accion(sigue:boolean){
    if(sigue == true){
      this.consultaImpuestos();
    }
  }
}
