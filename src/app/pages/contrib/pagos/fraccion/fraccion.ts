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
  ){

  }
  lstAnios:Options[] = [
      {nId:2024, sDescripcion:'2024'},
      {nId:2025, sDescripcion:'2025'},
  ];
  idContriB!:number;
  dtConsulta!:FraccionamientoRequest;
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
    this.dtConsulta = new FraccionamientoRequest();
    this.idContriB = info.usuario.idContribuyente;
    let fecha:Date = new Date()
    this.dtConsulta.anioInicio = fecha.getFullYear();
    this.dtConsulta.anioFin = fecha.getFullYear();
    this.dtConsulta.idContribuyente = this.idContriB;
    this.monto = 0;
    this.consultaImpuestos();
  }

  seleccionaAnio(event:any, indicador:number){
    if(indicador == 1){
      this.dtConsulta.anioInicio = event;
    }else{
      this.dtConsulta.anioFin = event;
    }
    this.consultaImpuestos();
  }

  consultaImpuestos(){
    this.cargaService.show();
    this.fraccionamientoService.getImpuestosPendientes(this.dtConsulta).subscribe({
      next: (rpta:any) => {
        this.cargaService.hide();
        console.log("Data Impuestos: ",rpta);
        this.lstDatos = rpta;
        this.lstDatos?.map((item:any) => {
          item.TOTALES = (item.MONTO + item.MORA + item.INTERES) - item.PAGADO ;
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
