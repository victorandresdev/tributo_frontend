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
  lstDatos:any[] = [
    {tributo:'Arbitrio Municipal',emision:'20/12/2012',codigo:'00211511', estado:'Pendiente', idEstado:0, monto:250, nId:1 },
    {tributo:'Arbitrio Municipal',emision:'20/12/2012',codigo:'00211511', estado:'Pendiente', idEstado:0, monto:250, nId:2 },
    {tributo:'Arbitrio Demo',emision:'20/12/2012',codigo:'00211511', estado:'Pendiente', idEstado:0, monto:250, nId:3 },
    {tributo:'Arbitrio Demo',emision:'20/12/2012',codigo:'00211511', estado:'Pendiente', idEstado:0, monto:250, nId:4 },
    {tributo:'Arbitrio Demo',emision:'20/12/2012',codigo:'00211511', estado:'Pendiente', idEstado:0, monto:250, nId:5 },
    {tributo:'Arbitrio Demo',emision:'20/12/2012',codigo:'00211511', estado:'Pendiente', idEstado:0, monto:250, nId:6 },
    {tributo:'Arbitrio Demo',emision:'20/12/2012',codigo:'00211511', estado:'Pendiente', idEstado:0, monto:250, nId:7 },
    {tributo:'Arbitrio Demo',emision:'20/12/2012',codigo:'00211511', estado:'Pendiente', idEstado:0, monto:250, nId:8 },
    {tributo:'Arbitrio Demo',emision:'20/12/2012',codigo:'00211511', estado:'Pendiente', idEstado:0, monto:250, nId:9 },
    {tributo:'Arbitrio Demo',emision:'20/12/2012',codigo:'00211511', estado:'Pendiente', idEstado:0, monto:250, nId:10 },
    {tributo:'Arbitrio Demo',emision:'20/12/2012',codigo:'00211511', estado:'Pendiente', idEstado:0, monto:250, nId:11 },
  ];
  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private cargaService: CargaService,
  ){

  }
  ngOnInit(): void {
    this.form = this.fb.group({
      impuesto:["opt3"]
    });
    this.form.get('impuesto')?.valueChanges.subscribe(val => {
      this.utilService.pestanaPagos(val,"opt3");
    });
  }
}
