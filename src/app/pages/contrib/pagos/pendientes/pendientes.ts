import { ImpuestoPredialRequest } from './../../../../shared/helpers/impuesto-predial-request';
import { ImpuestoPredialService } from './../../../../services/impuesto-predial.service';
import { UtilService } from './../../../../services/util.services';
import { APP_ROUTES } from './../../../../shared/constants/app.routes';
import { Component, OnInit } from '@angular/core';
import { TitlePage } from '../../../../shared/components/title-page/title-page';
import { MigajaPan } from '../../../../shared/components/migaja-pan/migaja-pan';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { ListInLine } from "../../../../shared/components/list-in-line/list-in-line";
import { Options } from '../../../../shared/helpers/options';
import { PendientesLista } from "./pendientes-lista/pendientes-lista";
import { TotalPagar } from "../../../../shared/components/total-pagar/total-pagar";
import { CargaService } from '../../../../services/carga.service';
import { ImpuestoPredialResponse } from '../../../../shared/helpers/impuesto-predial-response';
import { APP_CONSTANTS } from '../../../../shared/constants/app.constants';
import { ContribuyenteService } from '../../../../services/contribuyente.service';
import { DtImpuesto } from '../../../../shared/helpers/dtImpuestos';
import { ListaResumenRegistro } from '../../../../shared/helpers/lista-resumen-registro';

@Component({
  selector: 'app-pendientes',
  imports: [MigajaPan, TitlePage, MatButtonToggleModule,
    CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatIconModule, ListInLine, PendientesLista, TotalPagar],
  templateUrl: './pendientes.html',
  styleUrl: './pendientes.scss',
  standalone: true,
})
export class Pendientes implements OnInit {
  public form!: FormGroup;
  public monto!: number;
  dtConsulta!:ImpuestoPredialRequest;
  lstAnios:Array<Options> = [];
  idContriB!:number;
  lstDatos?:Array<DtImpuesto> = [];
  lstMarcados?:any[] = [];
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private cargaService: CargaService,
    private impuestoPredialService: ImpuestoPredialService,
    private contribuyenteService: ContribuyenteService
  ){

  }
  ngOnInit(): void {
    let info:any = this.utilService.validaSesion();
    this.dtConsulta = new ImpuestoPredialRequest();
    this.monto = 0;
    this.form = this.fb.group({
      impuesto:["opt1"],
      tipo:["I"]
    });
    this.idContriB = info.usuario.idContribuyente;
    this.lstAnios = this.utilService.getListaAnios();
    this.form.get('impuesto')?.valueChanges.subscribe(val => {
      this.utilService.pestanaPagos(val,"opt1");
    });
    this.form.get('tipo')?.valueChanges.subscribe(val => {
      let marcados:Array<string>;
      if(!Array.isArray(val)){
        marcados = [val];
      }else{
        marcados = val;
      }
      if(marcados.length == 0){
        this.utilService.getAlert("Información","Debe seleccionar al menos un tributo.","info","Entendido")
        this.form.get('tipo')?.setValue(["1"]);
        return;
      }else{
        let valFinal:string = (marcados.find((valMarcado:string) => valMarcado == APP_CONSTANTS.TIPO_IMPUESTO.IMPUESTOS) != undefined)?APP_CONSTANTS.TIPO_IMPUESTO.IMPUESTOS:APP_CONSTANTS.TIPO_IMPUESTO.TODOS;
        this.dtConsulta.estado = valFinal;
        this.consultaImpuestos();
      }
    });
    let fecha:Date = new Date()
    this.dtConsulta.anioInicio = fecha.getFullYear().toString();
    this.dtConsulta.anioFin = fecha.getFullYear().toString();
    this.dtConsulta.inicio = fecha.getFullYear();
    this.dtConsulta.fin = fecha.getFullYear();
    this.dtConsulta.estado = APP_CONSTANTS.TIPO_IMPUESTO.IMPUESTOS;
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
          datosItem.visibles?.push({concepto:"TRIBUTO",valor:item.TRIBUTDESC, tipo:'1'});
          datosItem.visibles?.push({concepto:"TOTAL",valor:item.TOTAL, tipo:'2'});
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
      dtFilas.forEach((item:ImpuestoPredialResponse) => {
        this.monto += item.SALDO || 0;
        this.lstMarcados?.push(
          {
            sConcepto: item.TRIBUTO,
            nPagara: item.SALDO,
            nIdDeuda: item.IDDEUDA
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

  /*
  testNumber(dato:string):number{
    let rpta:number = 0;
    rpta = Number.
    return rpta;
  }
    */
}
