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
  ){

  }
  lstAnios:Options[] = [
      {nId:2024, sDescripcion:'2024'},
      {nId:2025, sDescripcion:'2025'},
  ];
  lstDatos:any[] = [
    {tributo:'Arbitrio Demo',anio:2024, cuota: 1, afecto:200, interes:0, mora:0, vencimiento:'15/11/2025', totales:0, estado:1 },
    {tributo:'Arbitrio Demo',anio:2024, cuota: 1, afecto:200, interes:0, mora:0, vencimiento:'15/11/2025', totales:0, estado:1 },
    {tributo:'Arbitrio Demo',anio:2024, cuota: 1, afecto:200, interes:0, mora:0, vencimiento:'15/11/2025', totales:0, estado:1 },
    {tributo:'Arbitrio Demo',anio:2024, cuota: 1, afecto:200, interes:0, mora:0, vencimiento:'15/11/2025', totales:0, estado:1 },
    {tributo:'Arbitrio Demo',anio:2024, cuota: 1, afecto:200, interes:0, mora:0, vencimiento:'15/11/2025', totales:0, estado:1 },
    {tributo:'Arbitrio Demo',anio:2024, cuota: 1, afecto:200, interes:0, mora:0, vencimiento:'15/11/2025', totales:0, estado:1 },
    {tributo:'Arbitrio Demo',anio:2024, cuota: 1, afecto:200, interes:0, mora:0, vencimiento:'15/11/2025', totales:0, estado:1 },
    {tributo:'Arbitrio Demo',anio:2024, cuota: 1, afecto:200, interes:0, mora:0, vencimiento:'15/11/2025', totales:0, estado:1 },
    {tributo:'Arbitrio Demo',anio:2024, cuota: 1, afecto:200, interes:0, mora:0, vencimiento:'15/11/2025', totales:0, estado:1 },
  ];

  ngOnInit(): void {
    this.form = this.fb.group({
      impuesto:["opt2"]
    });
    this.form.get('impuesto')?.valueChanges.subscribe(val => {
      this.utilService.pestanaPagos(val,"opt2");
    });
  }
}
