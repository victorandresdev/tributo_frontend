import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Component, EventEmitter, Input, OnChanges, OnInit, output, Output, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Paginator } from "../../../../../shared/components/paginator/paginator";
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';
import { APP_CONSTANTS } from '../../../../../shared/constants/app.constants';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Detalle } from '../detalle/detalle';

@Component({
  selector: 'app-pendientes-lista',
  imports: [MatCardModule, MatTableModule, MatIconModule, Paginator, MatCheckboxModule, MatButtonModule, CommonModule],
  templateUrl: './pendientes-lista.html',
  styleUrl: './pendientes-lista.scss'
})
export class PendientesLista implements OnInit, OnChanges {
  dataResult!: MatTableDataSource<any>;
  selection = new SelectionModel<any>(true, []);
  length = 0;
  indexIni = 0;
  message!: string;
  displayedColumns: string[] = [
    'select',
    'periodo',
    'tributo',
    'predio',
    'afecto',
    'pagado',
    'saldo',
    'reajuste',
    'mora',
    'emision',
    'totales',
    'detalle',
  ];
  infoGrilla:any[] = [];
  arrListFiltrada:any[] = [];
  existData:boolean = false;

  @Input() arrList!: any[];
  @Input() totalFilas!: number;
  @Input() paginas!: number;
  @Output() cambiaPagina: EventEmitter<number> = new EventEmitter();
  @Output() seleccionCambio: EventEmitter<any> = new EventEmitter();
  @Output() seleccionados: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialog: MatDialog,
  ){}

  ngOnInit(): void {
    this.getLista();
    this.message = 'Cargando...';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['arrList']){
      this.getLista();
    }
  }

  getLista(){
    this.message = 'Cargando...';
    let startIndex:number = this.indexIni * APP_CONSTANTS.PAGE_SIZE;
    let endIndex:number = startIndex + APP_CONSTANTS.PAGE_SIZE;
    this.arrListFiltrada = [...this.arrList];
    let rds:number = this.arrListFiltrada.length % APP_CONSTANTS.PAGE_SIZE;
    this.paginas = Math.trunc(this.arrListFiltrada.length / APP_CONSTANTS.PAGE_SIZE) + ((rds > 0)?1:0);
    this.infoGrilla = this.arrListFiltrada.slice(startIndex, endIndex);
    this.dataResult = new MatTableDataSource<any>(this.infoGrilla);
    this.length = this.infoGrilla.length;
    if (this.length <= 0) {
      this.existData = false;
      this.message = 'No se encontraron registros.';
    }else{
      this.existData = true;
    }
  }

  pagina(event?:any){
    //this.cambiaPagina.emit(event.pageIndex);
    this.indexIni = event.pageIndex;
    //this.pageIndex = this.indexIni;
    this.getLista();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataResult.data.length;
    return numSelected === numRows;
  }

  toggleRow(row: any) {
    this.selection.toggle(row);
    this.seleccionados.emit(this.selection.selected);
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.selection.select(...this.dataResult.data);
    }
    this.seleccionados.emit(this.selection.selected);
  }

  verDetalle(fila:any){
    this.dialog.open(Detalle, {
      width: '400px',
      height: 'auto'
    });
  }
}
