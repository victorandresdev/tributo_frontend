import { Component, OnInit } from '@angular/core';
import { MigajaPan } from '../../../../shared/components/migaja-pan/migaja-pan';
import { TitlePage } from '../../../../shared/components/title-page/title-page';
import { FormBuilder } from '@angular/forms';
import { UtilService } from '../../../../services/util.services';
import { DateInLine } from "../../../../shared/components/date-in-line/date-in-line";
import { CargaService } from '../../../../services/carga.service';
import { HistoriaLista } from "./historia-lista/historia-lista";

@Component({
  selector: 'app-historia',
  imports: [MigajaPan, TitlePage, DateInLine, HistoriaLista],
  templateUrl: './historia.html',
  styleUrl: './historia.scss'
})
export class Historia implements OnInit {
  fechaInicio!:Date;
  fechaFin!:Date;
  lstDatos:any[] = [
    {recibo: '00000001255', tipoTramite:'FRACCIONAMIENTO', periodo:'01', pagado:0, fecha:'13/08/2025', anio:2026, lugar: 'COMERCIO', nId: 1 },
    {recibo: '00000001255', tipoTramite:'FRACCIONAMIENTO', periodo:'01', pagado:0, fecha:'13/08/2025', anio:2026, lugar: 'COMERCIO', nId: 2 },
    {recibo: '00000001255', tipoTramite:'FRACCIONAMIENTO', periodo:'01', pagado:0, fecha:'13/08/2025', anio:2026, lugar: 'COMERCIO', nId: 3 },
    {recibo: '00000001255', tipoTramite:'FRACCIONAMIENTO', periodo:'01', pagado:0, fecha:'13/08/2025', anio:2026, lugar: 'COMERCIO', nId: 4 },
    {recibo: '00000001255', tipoTramite:'FRACCIONAMIENTO', periodo:'01', pagado:0, fecha:'13/08/2025', anio:2026, lugar: 'COMERCIO', nId: 5 },
    {recibo: '00000001255', tipoTramite:'FRACCIONAMIENTO', periodo:'01', pagado:0, fecha:'13/08/2025', anio:2026, lugar: 'COMERCIO', nId: 6 },
    {recibo: '00000001255', tipoTramite:'FRACCIONAMIENTO', periodo:'01', pagado:0, fecha:'13/08/2025', anio:2026, lugar: 'COMERCIO', nId: 7 },
    {recibo: '00000001255', tipoTramite:'FRACCIONAMIENTO', periodo:'01', pagado:0, fecha:'13/08/2025', anio:2026, lugar: 'COMERCIO', nId: 8 },
    {recibo: '00000001255', tipoTramite:'FRACCIONAMIENTO', periodo:'01', pagado:0, fecha:'13/08/2025', anio:2026, lugar: 'COMERCIO', nId: 9 },
    {recibo: '00000001255', tipoTramite:'FRACCIONAMIENTO', periodo:'01', pagado:0, fecha:'13/08/2025', anio:2026, lugar: 'COMERCIO', nId: 10 },
  ];

  constructor(
    private fb: FormBuilder,
    private utilService: UtilService,
    private cargaService: CargaService,
  ){

  }

  ngOnInit(): void {
    this.fechaInicio = new Date();
    this.fechaFin = new Date();
  }
}
