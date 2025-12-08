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
  lstAnios:Options[] = [
    {nId:2024, sDescripcion:'2024'},
    {nId:2025, sDescripcion:'2025'},
  ];
  lstDatos:any[] = [
    {periodo: '2025-01', tributo:'Arbitrio Municipal',predio:'120117004474',afecto:200, pagado:0, saldo:0, reajuste:'15/11/2025', mora:0, emision:0, totales:0, estado:1 },
    {periodo: '2025-01', tributo:'Arbitrio Demo',predio:'120117004474',afecto:200, pagado:0, saldo:0, reajuste:'15/11/2025', mora:0, emision:0, totales:0, estado:1 },
    {periodo: '2025-01', tributo:'Arbitrio Demo',predio:'120117004474',afecto:200, pagado:0, saldo:0, reajuste:'15/11/2025', mora:0, emision:0, totales:0, estado:1 },
    {periodo: '2025-01', tributo:'Arbitrio Demo',predio:'120117004474',afecto:200, pagado:0, saldo:0, reajuste:'15/11/2025', mora:0, emision:0, totales:0, estado:1 },
    {periodo: '2025-01', tributo:'Arbitrio Demo',predio:'120117004474',afecto:200, pagado:0, saldo:0, reajuste:'15/11/2025', mora:0, emision:0, totales:0, estado:1 },
    {periodo: '2025-01', tributo:'Arbitrio Demo',predio:'120117004474',afecto:200, pagado:0, saldo:0, reajuste:'15/11/2025', mora:0, emision:0, totales:0, estado:1 },
    {periodo: '2025-01', tributo:'Arbitrio Demo',predio:'120117004474',afecto:200, pagado:0, saldo:0, reajuste:'15/11/2025', mora:0, emision:0, totales:0, estado:1 },
    {periodo: '2025-01', tributo:'Arbitrio Demo',predio:'120117004474',afecto:200, pagado:0, saldo:0, reajuste:'15/11/2025', mora:0, emision:0, totales:0, estado:1 },
    {periodo: '2025-01', tributo:'Arbitrio Demo',predio:'120117004474',afecto:200, pagado:0, saldo:0, reajuste:'15/11/2025', mora:0, emision:0, totales:0, estado:1 },
    {periodo: '2025-01', tributo:'Arbitrio Demo',predio:'120117004474',afecto:200, pagado:0, saldo:0, reajuste:'15/11/2025', mora:0, emision:0, totales:0, estado:1 },
  ];
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private cargaService: CargaService,
  ){

  }
  ngOnInit(): void {
    this.monto = 0;
    this.form = this.fb.group({
      impuesto:["opt1"],
      tipo:["1"]
    });
    this.form.get('impuesto')?.valueChanges.subscribe(val => {
      this.utilService.pestanaPagos(val,"opt1");
    });

  }


}
