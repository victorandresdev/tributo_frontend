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
  lstAnios:Options[] = [
    {nId:2024, sDescripcion:'2024'},
    {nId:2025, sDescripcion:'2025'},
  ];
  idContriB!:number;
  lstDatos?:Array<ImpuestoPredialResponse> = [];
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private cargaService: CargaService,
    private impuestoPredialService: ImpuestoPredialService
  ){

  }
  ngOnInit(): void {
    let info:any = this.utilService.validaSesion();
    this.dtConsulta = new ImpuestoPredialRequest();
    this.monto = 0;
    this.form = this.fb.group({
      impuesto:["opt1"],
      tipo:["1"]
    });
    this.idContriB = info.usuario.idContribuyente;
    this.form.get('impuesto')?.valueChanges.subscribe(val => {
      this.utilService.pestanaPagos(val,"opt1");
    });
    this.form.get('tipo')?.valueChanges.subscribe(val => {
      let marcados:any;
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
        this.dtConsulta.tipos = marcados;
        this.consultaImpuestos();
      }
    });
    let fecha:Date = new Date()
    this.dtConsulta.anioInicio = fecha.getFullYear();
    this.dtConsulta.anioFin = fecha.getFullYear();
    this.dtConsulta.tipos = [this.form.get('tipo')?.value];
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
    this.impuestoPredialService.getImpuestosPendientes(this.dtConsulta).subscribe({
      next: (rpta:any) => {
        this.cargaService.hide();
        console.log("Data Impuestos: ",rpta);
        this.lstDatos = rpta;
        this.lstDatos?.map((item:any) => {
          item.PREDIO = '';
          item.SALDO = (item.AFECTO + item.MORA) - item.PAGADO;
          item.TOTALES = item.AFECTO + item.MORA;
          item.ESTADO = (item.SALDO == 0)?'CANCELADO':'PENDIENTE';
        });
      },
      error: () => {
        this.cargaService.hide();
      }
    })
  }

  muestraMarcados(dtFilas:any){
    this.monto = 0;
    if(dtFilas.length > 0){
      dtFilas.forEach((item:ImpuestoPredialResponse) => {
        this.monto += item.SALDO || 0;
      });
    }
  }
}
