import { LiquidacionService } from './../../../../services/liquidacion.service';
import { Component, OnInit } from '@angular/core';
import { MigajaPan } from '../../../../shared/components/migaja-pan/migaja-pan';
import { TitlePage } from '../../../../shared/components/title-page/title-page';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { UtilService } from '../../../../services/util.services';
import { APP_ROUTES } from '../../../../shared/constants/app.routes';
import { LiquidacionLista } from "./liquidacion-lista/liquidacion-lista";
import { TotalPagar } from "../../../../shared/components/total-pagar/total-pagar";
import { CargaService } from '../../../../services/carga.service';
import { LiquidacionRequest } from '../../../../shared/helpers/liquidacion-request';
import { LiquidacionResponse } from '../../../../shared/helpers/liquidacion-response';

@Component({
  selector: 'app-liquidacion',
  imports: [MigajaPan, TitlePage, MatButtonToggleModule,
    CommonModule, ReactiveFormsModule, FormsModule, MatInputModule, LiquidacionLista, TotalPagar],
  templateUrl: './liquidacion.html',
  styleUrl: './liquidacion.scss'
})
export class Liquidacion implements OnInit{
  public form!: FormGroup;
  public monto!:number;
  dtConsulta!:LiquidacionRequest;
  lstDatos?:Array<LiquidacionResponse> = [];
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private cargaService: CargaService,
    private liquidacionService: LiquidacionService
  ){

  }
  ngOnInit(): void {
    let info:any = this.utilService.validaSesion();
    this.form = this.fb.group({
      impuesto:["opt3"]
    });
    this.form.get('impuesto')?.valueChanges.subscribe(val => {
      this.utilService.pestanaPagos(val,"opt3");
    });
    this.monto = 0;
    this.dtConsulta = new LiquidacionRequest();
    this.dtConsulta.idContribuyente = info.usuario.idContribuyente;
    this.consultaImpuestos();
  }

  consultaImpuestos(){
    this.cargaService.show();
    this.liquidacionService.getLiquidacionPendientes(this.dtConsulta).subscribe({
      next: (rpta:any) => {
        this.cargaService.hide();
        console.log("Data Impuestos: ",rpta);
        this.lstDatos = rpta;
      },
      error: () => {
        this.cargaService.hide();
      }
    })
  }

  muestraMarcados(dtFilas:any){
    this.monto = 0;
    if(dtFilas.length > 0){
      dtFilas.forEach((item:LiquidacionResponse) => {
        this.monto += item.MONTO || 0;
      });
    }
  }
}
